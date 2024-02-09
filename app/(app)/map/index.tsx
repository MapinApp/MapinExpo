import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import {
  Dimensions,
  StyleSheet,
  Animated,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
// Components
import { Block, Button, Text, Image } from "@/components/ui";
import { useTheme } from "@/context/theme";
// Map
import SearchBar from "@/components/map/SearchBar";
import Constants from "expo-constants";
import darkMapStyle from "@/assets/map/darkMapStyle.json";
import lightMapStyle from "@/assets/map/lightMapStyle.json";
// Util
const util = require("util");
// console.log(util.inspect(myObject, false, null, true /* enable colors */))

export default function App() {
  const mapRef = React.createRef<MapView>();
  const { isDark, theme } = useTheme();
  const { colors, assets, sizes } = theme;

  // Use this for the Location of Search Bar and Map
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>({
    latitude: 51.510067,
    longitude: -0.133869,
    latitudeDelta: 0.022,
    longitudeDelta: 0.021,
  });

  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    address: string;
    img_url: string;
  }>({
    name: "",
    address: "",
    img_url: "",
  });

  const goToLocation = async (lat: number, lng: number) => {
    mapRef?.current?.animateCamera({
      center: { latitude: lat, longitude: lng },
    });
  };

  // ============================================================================
  // =========================== On Search Functions ============================
  // ============================================================================

  const generatePhotoDetails = ({
    html_attributions,
    photo_reference,
    width,
  }: {
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }) => {
    const defaultName = "Unknown";
    const defaultHref = "#";

    let name = defaultName;
    let href = defaultHref;

    if (html_attributions && html_attributions.length > 0) {
      const hrefRegex = /href="([^"]*)"/;
      const nameRegex = />([^<]+)</;

      const hrefMatches = hrefRegex.exec(html_attributions[0]);
      const nameMatches = nameRegex.exec(html_attributions[0]);

      href = hrefMatches ? hrefMatches[1] : defaultHref;
      name = nameMatches ? nameMatches[1] : defaultName;
    }

    const placesPhotoUrl = photo_reference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photoreference=${photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}`
      : null;

    return {
      photo_attribution_href: href,
      photo_attribution_name: name,
      places_photo_url: placesPhotoUrl,
    };
  };

  const doesPlaceExist = async (places_id: string) => {
    // If referral exists, return true, else return false
    try {
      const { data, error } = await supabase
        .from("places")
        .select("*")
        .eq("places_id", places_id);
      if (error) {
        alert(error.message);
        // throw new Error(error.message);
      }
      if (data) {
        if (data.length > 0) {
          return data[0];
        }
        return false;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking if place exists:", error);
      return false; // In case of error, conservatively return false to prevent false negatives
    }
  };

  const onResultClick = async (details: any) => {
    // console.log(util.inspect(details, false, null, true /* enable colors */));
    // We want to check of this places_id exists in the database
    let data = await doesPlaceExist(details.place_id);
    if (data) {
      console.log("Place already exists in database");
      console.log(data);
      // If yes, retrieve the data and display it
    } else {
      // If no, then we want to store the data in the database in supabase and then display it

      let photoDetails =
        details.photos?.length > 0
          ? generatePhotoDetails(details.photos[0])
          : ({} as any);

      let data = {
        places_id: details?.place_id || null,
        name: details?.name || null,
        formatted_address: details?.formatted_address || null,
        lat: details?.geometry?.location?.lat || null,
        lng: details?.geometry?.location?.lng || null,
        types: details?.types || [],
        maps_url: details?.url || null,
        website: details?.website || null,
        price_level: details?.price_level || null,
        opening_hours: details?.opening_hours?.periods || null,
        phone_number: details?.formatted_phone_number || null,
        editorial_summary: details?.editorial_summary?.overview || null,
        business_status: details?.business_status || null,
        viewport_lat_delta:
          details?.geometry?.viewport?.northeast?.lat -
            details?.geometry?.viewport?.southwest?.lat || 0,
        viewport_lng_delta:
          details?.geometry?.viewport?.northeast?.lng -
            details?.geometry?.viewport?.southwest?.lng || 0,
        ...photoDetails,
      };
      try {
        // Insert to places
        const { error } = await supabase.from("places").insert([data]);
        if (error) throw new Error(error.message);
        // Display newly inserted data
      } catch (error) {
        console.error("Error inserting new place:", error);
      }

      // Go to the location
      goToLocation(data.lat, data.lng);
      // set the selected place
      setSelectedPlace({
        name: data.name,
        address: data.formatted_address,
        img_url: photoDetails?.places_photo_url,
      });
      console.log(util.inspect(data, false, null, true /* enable colors */));
    }
  };

  // ============================================================================
  // =========================== On Load ========================================
  // ============================================================================

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location permission is needed to get the most out of Mapin!"
        );
        return;
      }
      let locationResp = await Location.getCurrentPositionAsync({});
      setLocation({
        ...location,
        latitude: locationResp.coords.latitude,
        longitude: locationResp.coords.longitude,
      });
    })();
  }, []);

  return (
    <Block paddingTop={Constants.statusBarHeight}>
      <SearchBar
        deviceLocation={location}
        funOnPress={(details) => onResultClick(details)}
      />
      <MapView
        ref={mapRef}
        customMapStyle={isDark ? darkMapStyle : lightMapStyle}
        region={location}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        showsIndoors={false}
        showsBuildings={false}
        provider="google"
        style={styles.map}
      />
      {/* Location Card */}
      <Block>
        <Block
          card
          row
          position="absolute"
          bottom={150}
          right={0}
          marginHorizontal={sizes.xs}
        >
          <Image source={selectedPlace.img_url} height={"100%"} width={"33%"} />
          <Block padding={sizes.s} justify="space-between">
            <Text p marginBottom={15}>
              {selectedPlace.name}
            </Text>
            <TouchableOpacity>
              <Block row align="center">
                <Text p semibold marginRight={sizes.s} color={colors.link}>
                  {selectedPlace.address}
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={16}
                  color={colors.text}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
      {/* Button to Recenter */}
      <Button
        onPress={() => goToLocation(location.latitude, location.longitude)}
        position="absolute"
        bottom={10}
        right={10}
        outlined
        color={colors.background}
        flex={0}
        align="center"
        justify="center"
      >
        <Ionicons name="locate" size={20} color="white" />
      </Button>
    </Block>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Dimensions, StyleSheet, Animated, Platform } from "react-native";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
// Components
import { Block, Button, Text } from "@/components/ui";
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
  const { isDark, theme } = useTheme();
  const { colors } = theme;

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

  const generatePhotoDetails = (photo: {
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }) => {
    // Default values in case keys are missing or null
    const defaultName = "Unknown";
    const defaultHref = "#";
    const defaultWidth = 400; // Default width if not provided

    // Check if html_attributions is present and has at least one element
    let name = defaultName;
    let href = defaultHref;
    let photoUrl = null;

    // Check if photos, html_attributions are present and valid
    if (photo.html_attributions && photo.html_attributions.length > 0) {
      const hrefRegex = /href="([^"]*)"/;
      const nameRegex = />([^<]+)</;

      const hrefMatches = hrefRegex.exec(photo.html_attributions[0]);
      const nameMatches = nameRegex.exec(photo.html_attributions[0]);

      href = hrefMatches ? hrefMatches[1] : defaultHref;
      name = nameMatches ? nameMatches[1] : defaultName;
    }

    return {
      photo_attribution_href: href,
      photo_attribution_name: name,
      places_photo_url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photo.width}&photoreference=${photo.photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}`,
    };
  };

  const onResultClick = (details: any) => {
    // console.log(util.inspect(details, false, null, true /* enable colors */));
    // We want to check of this places_id exists in the database
    // If yes, retrieve the data and display it
    // If no, then we want to store the data in the database in supabase and then display it

    let href = "#";
    let name = "Unknown";
    let photoUrl = null;

    if (details.photos && details.photos.length > 0) {
      const {
        photo_attribution_href,
        photo_attribution_name,
        places_photo_url,
      } = generatePhotoDetails(details.photos[0]);

      href = photo_attribution_href;
      name = photo_attribution_name;
      photoUrl = places_photo_url;
    }

    let data = {
      places_id: details.place_id || null,
      name: details.name || null,
      formatted_address: details.formatted_address || null,
      lat: details.geometry.location.lat || null,
      lng: details.geometry.location.lng || null,
      types: details.types || [],
      maps_url: details.url || null,
      website: details.website || null,
      price_level: details.price_level || null,
      opening_hours: details.opening_hours.periods || null,
      phone_number: details.formatted_phone_number || null,
      editorial_summary: details.editorial_summary.overview || null,
      business_status: details.business_status || null,
      viewport_lat_delta:
        details.geometry?.viewport?.northeast.lat -
          details.geometry?.viewport?.southwest.lat || 0,
      viewport_lng_delta:
        details.geometry?.viewport?.northeast.lng -
          details.geometry?.viewport?.southwest.lng || 0,
      photo_attribution_href: href,
      photo_attribution_name: name,
      places_photo_url: photoUrl,
    };
    console.log(util.inspect(data, false, null, true /* enable colors */));
  };

  const mapRef = React.createRef<MapView>();

  const goToLocation = async (lat: number, lng: number) => {
    mapRef?.current?.animateCamera({
      center: { latitude: lat, longitude: lng },
    });
  };

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

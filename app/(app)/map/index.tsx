import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
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
// const util = require("util");
// console.log(util.inspect(myObject, false, null, true /* enable colors */))

interface DeviceLocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Place {
  name: string;
  address: string;
  img_url: string | null;
  latitude?: number;
  longitude?: number;
}

interface PlacePhotoDetails {
  photo_attribution_href: string;
  photo_attribution_name: string;
  places_photo_url: string | null;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Position {
  x: number;
  y: number;
}

interface POIClickEvent {
  coordinate: Coordinate;
  name: string;
  placeId: string;
  position: Position;
}

export default function App() {
  const mapRef = React.createRef<MapView>();
  const { isDark, theme } = useTheme();
  const { colors, sizes } = theme;

  // Use this for the Location of Search Bar and Map
  const [deviceLocation, setDeviceLocation] = useState<DeviceLocation>({
    latitude: 51.510067,
    longitude: -0.133869,
    latitudeDelta: 0.022,
    longitudeDelta: 0.021,
  });

  const [selectedPlace, setSelectedPlace] = useState<Place>({
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
  }): PlacePhotoDetails => {
    // If the places API returns at least 1 photo, we execute this function to extract the photo details
    const defaultName = "Unknown";
    const defaultHref = "#";

    let name = defaultName;
    let href = defaultHref;

    if (html_attributions && html_attributions.length > 0) {
      // Extract the name and href from the HTML attributions
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
    } as PlacePhotoDetails;
  };

  const doesPlaceExist = async (places_id: string) => {
    // If place exists, return place data, else return false
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

  const uploadPlaceImage = async (image: ArrayBuffer, imagePath: string) => {
    // Upload the image to Supabase Storage
    // Will return the URL of the uploaded image
    try {
      // Utility function to upload an image to Supabase and return the URL
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("places")
        .upload(imagePath, image, {
          contentType: "yimage/jpeg",
        });
      if (uploadError) {
        console.log("Error uploading image to Supabase:", uploadError.message);
        throw new Error(uploadError.message);
      }
      return downloadPlaceImage(imagePath);
    } catch (error) {
      console.error("Error uploadPlaceImage:", error);
      return null;
    }
  };

  const downloadPlaceImage = async (
    imagePath: string
  ): Promise<string | null> => {
    try {
      // const { data, error } = await supabase.storage
      //   .from("places")
      //   .download(imagePath);
      // if (error) {
      //   throw error;
      // }
      // return new Promise((resolve, reject) => {
      //   const fr = new FileReader();
      //   fr.onload = () => resolve(fr.result as string);
      //   fr.onerror = () => reject(null);
      //   fr.readAsDataURL(data);
      // });

      const { data, error } = await supabase.storage
        .from("places")
        .createSignedUrl(imagePath, 600);

      if (error) {
        console.log("Error downloading image from Supabase:", error.message);
        throw new Error(error.message);
      }
      return data?.signedUrl || null;
    } catch (error) {
      console.error("Error downloadPlaceImage:", error);
      return null;
    }
  };

  const onResultClick = async (details: any) => {
    // console.log(util.inspect(details, false, null, true /* enable colors */));
    // We want to check of this places_id exists in the database
    let data = await doesPlaceExist(details.place_id);
    if (data) {
      // If yes, use the retrieved data and display it
      if (
        data.lat !== null &&
        data.lng !== null &&
        data.name !== null &&
        data.formatted_address !== null
      ) {
        let imageUrl = null;
        if (data.places_photo_url !== null) {
          // Fetch the image from Supabase Storage
          imageUrl = await downloadPlaceImage(data.places_photo_url);
        }
        // Go to the location
        goToLocation(data.lat, data.lng);
        setSelectedPlace({
          name: data.name,
          address: data.formatted_address,
          latitude: data.lat,
          longitude: data.lng,
          img_url: imageUrl,
        });
      }
      // console.log(util.inspect(data, false, null, true /* enable colors */));
    } else {
      // Go to the location
      goToLocation(
        details?.geometry?.location?.lat || null,
        details?.geometry?.location?.lng || null
      );
      // set the selected place
      setSelectedPlace({
        name: details?.name || null,
        address: details?.formatted_address || null,
        img_url: null,
        latitude: details?.geometry?.location?.lat || null,
        longitude: details?.geometry?.location?.lng || null,
      });

      // If It's a new place,  we want to store the data in the database in supabase before we display it
      let photoDetails = {
        photo_attribution_href: "#",
        photo_attribution_name: "Unknown",
        places_photo_url: null,
      } as PlacePhotoDetails;
      const imagePath = `${details.place_id}.jpg`;

      if (details.photos?.length === 0) {
        // This will catch if there are no photos for the place
        console.error("No photos found for this place");
      } else {
        // Generate the photo details from the first photo
        photoDetails = generatePhotoDetails(details.photos[0]);
        /*
        {
          "photo_attribution_href": "https://maps.google.com/maps/contrib/110445910939828919089",
          "photo_attribution_name": "Tandoor Chophouse",
          "places_photo_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1347&photoreference=ATplDJY-BYQp_kNuJtvIjotbVNMVWBApP0F20N2tmUBFxZyvxLtbE8DYrpmtSW9m85emuUQCANqW4YVQPNV23z0hobEtw2M4ajS0fMRUHdOb6d21FZgTgnzbhr7626tTf0Gd0_bp9hXizh4M1dATNmtug7kb4GwCXZB4R2n5poI1AWzoZuJB&key=AIzaSyAs3vAwusITtRwM6FPSsEWrfArv7r59llg"
        }
        */
        if (photoDetails.places_photo_url !== null) {
          // Fetch the image from the URL provided by Google Places API if we have a URL
          const imageArrayBuffer = (await fetch(
            photoDetails.places_photo_url
          ).then((r) => r.arrayBuffer())) as ArrayBuffer;
          // Upload the image to Supabase Storage
          let result = await uploadPlaceImage(imageArrayBuffer, imagePath);
          if (result) {
            setSelectedPlace(
              (currentPlace) =>
                ({
                  ...currentPlace,
                  img_url: result,
                } as Place)
            );
          }
        }
      }

      // Construct the place data including the URL of the uploaded image
      let placeData = {
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
        // If the photo URL is still the google API link, we don't want it in the db
        // We don't want to overwrite photoDetails, so it is still rendered
        places_photo_url: imagePath,
      };
      // Insert the place data into the "places" table, including the image URL
      const { error } = await supabase.from("places").insert([placeData]);
      if (error) throw new Error(error.message);
    }
  };

  // ============================================================================
  // =========================== POI ==========================================
  // ============================================================================

  const onPoiClick = async (e: any) => {
    let clickedData: POIClickEvent = e.nativeEvent;
    console.log("POI Clicked:", clickedData);
    // Go to the location
    goToLocation(
      clickedData.coordinate.latitude,
      clickedData.coordinate.longitude
    );
    // Check if the place exists in the database
    let data = await doesPlaceExist(clickedData.placeId);
    console.log(data);
    // If false Fetch data from places API
  };
  // ============================================================================
  // =========================== Lists ==========================================
  // ============================================================================

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
      setDeviceLocation((currentLocation) => ({
        ...currentLocation,
        latitude: locationResp.coords.latitude,
        longitude: locationResp.coords.longitude,
      }));
    })();
  }, []);

  return (
    <Block paddingTop={Constants.statusBarHeight}>
      <SearchBar
        deviceLocation={deviceLocation}
        funOnPress={(details) => onResultClick(details)}
      />
      <MapView
        ref={mapRef}
        customMapStyle={isDark ? darkMapStyle : lightMapStyle}
        region={deviceLocation}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        showsIndoors={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoorLevelPicker={false}
        provider="google"
        style={styles.map}
        loadingBackgroundColor={String(colors.background)}
        onPoiClick={onPoiClick}
      >
        {/* Markers */}
        {/* Conditional rendering of Marker */}
        {selectedPlace.latitude && selectedPlace.longitude && (
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            title={selectedPlace.name}
            description={selectedPlace.address}
          />
        )}
      </MapView>

      {/* Search Location Card */}
      {selectedPlace.name && selectedPlace.address ? (
        <Block>
          <Block
            card
            row
            position="absolute"
            bottom={150}
            right={0}
            marginHorizontal={sizes.xs}
          >
            <Image
              source={selectedPlace.img_url}
              height={"100%"}
              width={"33%"}
            />
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
      ) : null}

      {/* Button to Recenter */}
      <Button
        onPress={() => {
          goToLocation(deviceLocation.latitude, deviceLocation.longitude);
          setSelectedPlace({
            name: "",
            address: "",
            img_url: "",
          } as Place);
        }}
        position="absolute"
        bottom={10}
        right={10}
        outlined
        color={colors.background}
        flex={0}
        align="center"
        justify="center"
      >
        <Ionicons name="locate" size={20} color={String(colors.text)} />
      </Button>

      {/* List Button */}
      <Button
        onPress={() => {
          goToLocation(deviceLocation.latitude, deviceLocation.longitude);
          setSelectedPlace({
            name: "",
            address: "",
            img_url: "",
          } as Place);
        }}
        position="absolute"
        bottom={10}
        right={75}
        outlined
        color={colors.background}
        flex={0}
        align="center"
        justify="center"
      >
        <Ionicons name="albums-outline" size={20} color={String(colors.text)} />
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

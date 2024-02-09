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
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  });

  const onResultClick = (details: any) => {
    console.log(util.inspect(details, false, null, true /* enable colors */));
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

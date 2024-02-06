import React, { useState, useEffect, useRef } from "react";
import { Dimensions, StyleSheet, Animated, Platform } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
// Custom components
import lightMapStyle from "@/assets/MapStyles/lightMapStyle.json";
import darkMapStyle from "@/assets/MapStyles/darkMapStyle.json";
import Data from "@/constants/mock/list.json";
import { useTheme } from "@/context/theme";
import { Block } from "@/components/ui";
import SearchBar from "./SearchBar";
import { ChipScrollView, CardScrollView } from "./";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map = () => {
  const { theme, isDark, handleIsDark } = useTheme();

  const [deviceLocation, setDeviceLocation] = useState({
    latitude: 51.510067,
    longitude: -0.133869,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [pin, setPin] = useState({
    latitude: 51.510067,
    longitude: -0.133869,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState(Data[0].pin);

  const mapRef = React.createRef();
  const ScrollViewRef = useRef(null);

  const goToLocation = async (lat, lng) => {
    mapRef.current.animateCamera({ center: { latitude: lat, longitude: lng } });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      });
      setDeviceLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const onResultClick = (details) => {
    console.log(Data[0].pin);

    console.log(`  "pin_photo_url": "${details.photos[0].photo_reference}",
      "pin_name": "${details.name}",
      "latitude": ${details.geometry.location.lat},
      "longitude": ${details.geometry.location.lng},
      "address": "${details.formatted_address}",
      "postcode": "${details.address_components[6].long_name}",
      "rating": "${details.rating}",
      "type": "${details.types[0]}",`);

    // setRegion({
    //   latitude: details.geometry.location.lat,
    //   longitude: details.geometry.location.lng,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
  };

  let mapAnimation = new Animated.Value(0);
  let mapIndex = 0;

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item

      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          // const { coordinate } = markers[index].latitude;
          // console.log(coordinate)
          mapRef.current.animateToRegion(
            {
              latitude: markers[index].latitude,
              longitude: markers[index].longitude,
              latitudeDelta: deviceLocation.latitudeDelta,
              longitudeDelta: deviceLocation.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    ScrollViewRef.current?.scrollTo({ x: x, y: 0, animated: true });
  };

  return (
    <>
      <Block>
        <SearchBar
          deviceLocation={deviceLocation}
          funOnPress={(details) => onResultClick(details)}
        />

        <MapView
          customMapStyle={isDark ? darkMapStyle : lightMapStyle}
          style={styles.map}
          ref={mapRef}
          region={deviceLocation}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          showsIndoors={false}
          showsBuildings={false}
          // onPoiClick={}
          // animateCamera

          provider="google"
        >
          {markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={(e) => onMarkerPress(e)}
              >
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    source={assets.marker}
                    style={[styles.marker, scaleStyle]}
                    resizeMode="cover"
                  />
                  {/* <Callout tooltip>
                      <CustomCallout
                        title={marker.pin_name}
                        info={marker.notes}
                      />
                    </Callout> */}
                </Animated.View>
              </MapView.Marker>
            );
          })}

          {/* <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              image={assets.marker}
            >
              <Callout tooltip>
                <CustomCallout title="Some Location" info="some info" />
              </Callout>
  
            </Marker> */}
        </MapView>

        <ChipScrollView />

        <CardScrollView
          markers={markers}
          mapAnimation={mapAnimation}
          ScrollViewRef={ScrollViewRef}
        />
      </Block>

      {/* <Button
          onPress={() =>
            goToLocation(deviceLocation.latitude, deviceLocation.longitude)
          }
        >
          <Text>Recentre</Text>
        </Button> */}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  marker: {
    width: 30,
    height: 30,
  },
});

export default Map;

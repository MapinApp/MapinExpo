import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import * as Location from "expo-location";
// Components
import {
  Block,
  Button,
  Input,
  Image,
  Text,
  Checkbox,
  Modal,
} from "@/components/ui";
import { useTheme } from "@/context/theme";
import * as regex from "@/lib/regex";
import SearchBar from "@/components/map/SearchBar";
// Types
import { DeviceLocation, PlaceResult } from "@/types/maps";

interface PlaceInfo {
  placeId: string;
  placeName: string;
  placeAddress: string;
}

export default function AddPin() {
  const { theme, isDark } = useTheme();
  const { colors, sizes, assets, gradients } = theme;
  const router = useRouter();
  // Replace with Data Context
  const isLoading = false;

  // References not visible to the user
  const [place, setPlace] = useState<PlaceResult | null>(null);
  const [listId, setListId] = useState<string | null>(null);
  // To be used with derivative pins
  const [parentPinId, setParentPinId] = useState<string>("");
  // User Input
  const [pinName, setPinName] = useState<string>("");
  const [pinNotes, setPinNotes] = useState<string>("");
  const [pinVisited, setPinVisited] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [pinIsPrivate, setPinIsPrivate] = useState<boolean>(false);
  // Modals
  const [showRatingModal, setRatingModal] = useState(false);
  const [showListModal, setListModal] = useState(false);
  /**
   * Validity checking of Create Pin Form
   * 1. Name should be at least 3 characters
   * 2. Review and Rating are only possible if the place is visited
   */
  const [isValid, setIsValid] = useState<ICreatePinValidation>({
    pinName: false,
    reviewRating: false,
  });

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      pinName: regex.pinName.test(pinName),
      reviewRating: pinVisited ? Boolean(review && rating) : true,
    }));
  }, [pinName, pinVisited, review, rating, setIsValid]);

  const handleCreatePin = () => {
    if (isValid.pinName && isValid.reviewRating && !isLoading) {
      console.log("Create Pin");
    } else {
      if (!isValid.pinName) {
        alert("Seems your Pin Name isn't valid...");
      }
      if (!isValid.reviewRating) {
        alert("You can't leave a review without visiting the place...");
      }
    }
  };

  const onResultClick = (details: PlaceResult) => {
    setPlace(details);
  };

  // Use this for the Location of Search Bar and Map
  const [deviceLocation, setDeviceLocation] = useState<DeviceLocation>({
    latitude: 51.510067,
    longitude: -0.133869,
    latitudeDelta: 0.022,
    longitudeDelta: 0.021,
  });

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
    <Block>
      <SearchBar
        deviceLocation={deviceLocation}
        funOnPress={(details) => onResultClick(details)}
      />
      <Block color={colors.list}>
        <Block safe>
          <Block
            scroll
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: sizes.xs,
              paddingTop: sizes.inputHeight * 2.5,
            }}
          >
            <Block>
              {/* Image and Place Name */}
              <Block marginVertical={sizes.xs} list>
                {/* Image */}
                <Image
                  contentFit="cover"
                  source={
                    isDark ? assets.backgroundDark : assets.backgroundLight
                  }
                  height={200}
                  marginVertical={sizes.sm}
                />
                <Text p marginTop={sizes.s} marginLeft={sizes.xs}>
                  Creating a new pin for:
                </Text>
                <Text
                  h5
                  bold
                  uppercase
                  gradient={gradients.primary}
                  marginTop={sizes.s}
                >
                  Place Name
                </Text>
                <Text
                  p
                  marginTop={sizes.s}
                  marginLeft={sizes.xs}
                  marginBottom={sizes.sm}
                >
                  Address
                </Text>
              </Block>
              {/* form inputs 1 */}
              <Block marginVertical={sizes.xs} list>
                {/* Checkboxes */}
                <Block
                  row
                  flex={0}
                  align="center"
                  justify="center"
                  marginVertical={sizes.s}
                >
                  <Block row align="center" justify="center">
                    <Block flex={0} radius={6} align="center" justify="center">
                      <Checkbox
                        checked={pinVisited}
                        onPress={() => setPinVisited(!pinVisited)}
                      />
                      <Text>I've been here!</Text>
                    </Block>
                  </Block>

                  <Block row align="center" justify="center">
                    <Block flex={0} radius={6} align="center" justify="center">
                      <Checkbox
                        checked={pinIsPrivate}
                        onPress={() => setPinIsPrivate(!pinVisited)}
                      />
                      <Text>This pin is private!</Text>
                    </Block>
                  </Block>
                </Block>

                <Input
                  label="Name"
                  marginBottom={sizes.sm}
                  success={Boolean(pinName && isValid.pinName)}
                  danger={Boolean(pinName && !isValid.pinName)}
                  onChangeText={(text) => setPinName(text)}
                  value={pinName}
                  autoCapitalize={"none"}
                  placeholder="Enter Pin Name"
                  autoCorrect={false}
                />
                <Input
                  label="Notes"
                  marginBottom={sizes.sm}
                  onChangeText={(text) => setPinNotes(text)}
                  value={pinNotes}
                  autoCapitalize={"none"}
                  placeholder="Have any Notes?"
                  autoCorrect={false}
                />
                <Button
                  onPress={() => console.log("NEW PIC")}
                  marginBottom={sizes.s}
                  marginTop={sizes.s}
                  gradient={gradients.primary}
                >
                  <Text medium size={sizes.p} white uppercase>
                    {isLoading ? "Loading ..." : "Upload Custom Image"}
                  </Text>
                </Button>
              </Block>

              {/* form inputs 2 */}
              <Block marginVertical={sizes.xs} list>
                <Pressable onPressIn={() => setListModal(true)}>
                  <Input
                    marginBottom={sizes.xs}
                    label="List"
                    onFocus={() => setListModal(true)}
                    disabled
                    value={listId ? listId : "No List"}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    inputMode="none"
                    placeholder="Choose List"
                  />
                </Pressable>
              </Block>

              {/* form inputs 3 */}
              {pinVisited && (
                <Block marginVertical={sizes.xs} list>
                  <Input
                    label="Review"
                    marginBottom={sizes.sm}
                    onChangeText={(text) => setReview(text)}
                    value={review}
                    autoCapitalize={"none"}
                    placeholder="Enter Review"
                    autoCorrect={false}
                    multiline={true}
                    numberOfLines={10}
                  />

                  <Block flex={0} marginTop={sizes.s}>
                    {/* Label */}
                    <Text p medium marginBottom={sizes.s}>
                      Rating
                    </Text>

                    <Pressable onPressIn={() => setRatingModal(true)}>
                      {/* Create a Block with a row of stars */}
                      <Block
                        row
                        outlined
                        justify="space-between"
                        marginBottom={sizes.sm}
                        paddingHorizontal={sizes.inputPadding}
                        radius={sizes.inputRadius}
                        height={sizes.inputHeight}
                      >
                        <Block row align="center" justify="flex-start">
                          <Text>{rating}/5</Text>
                        </Block>
                        <Block row align="center" justify="flex-end">
                          {
                            // Display stars based on rating
                            Array.from({ length: 5 }, (_, index) => (
                              <Ionicons
                                key={index}
                                name="star"
                                size={16}
                                color={
                                  index < rating ? colors.star : colors.gray
                                }
                              />
                            ))
                          }
                        </Block>
                      </Block>
                    </Pressable>
                  </Block>
                </Block>
              )}

              <Button
                onPress={() => handleCreatePin()}
                disabled={
                  !Object.values(isValid).every((item) => item === true) ||
                  isLoading
                }
                marginBottom={sizes.s}
                marginTop={sizes.sm}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
              >
                <Text medium size={sizes.p} white uppercase>
                  {isLoading ? "Loading ..." : "Create Pin"}
                </Text>
              </Button>

              <Button onPress={() => router.push("/(app)/map")}>
                <Text p underline primary>
                  Go to Map
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
      {/* Rating Modal */}
      <Modal
        visible={showRatingModal}
        onRequestClose={() => setRatingModal(false)}
      >
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={[1, 2, 3, 4, 5]}
          renderItem={({ item }) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                setRating(item);
                setRatingModal(false);
              }}
            >
              <Text h5 transform="uppercase">
                {item}
              </Text>
            </Button>
          )}
        />
      </Modal>
      {/* List Modal */}
      <Modal visible={showListModal} onRequestClose={() => setListModal(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={[null, "list 1", "List 2"]}
          renderItem={({ item }) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                setListId(item);
                setListModal(false);
              }}
            >
              <Text h5 transform="uppercase">
                {item ? item : "No List"}
              </Text>
            </Button>
          )}
        />
      </Modal>
    </Block>
  );
}

interface ICreatePinValidation {
  pinName: boolean;
  reviewRating: boolean;
}

import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { FlatList, Pressable } from "react-native";
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

export default function AddPin() {
  const { theme, isDark } = useTheme();
  const { colors, sizes, assets, gradients } = theme;
  const router = useRouter();
  // Replace with Data Context
  const isLoading = false;

  // References not visible to the user
  const [placeId, setPlaceId] = useState<string>("");
  const [placeName, setPlaceName] = useState<string>("");
  const [listId, setListId] = useState<string>("");
  const [parentPinId, setParentPinId] = useState<string>("");
  // User Input
  const [pinName, setPinName] = useState<string>("");
  const [pinNotes, setPinNotes] = useState<string>("");
  const [pinVisited, setPinVisited] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [pinIsPrivate, setPinIsPrivate] = useState<boolean>(false);
  // Rating Modal
  const [showRatingModal, setRatingModal] = useState(false);

  const displayStars = (rating: number) => {
    let stars = `${rating}/5 `;
    for (let i = 0; i < rating; i++) {
      stars += "★";
    }
    // Add empty stars for the remaining ratings ☆
    for (let i = rating; i < 5; i++) {
      stars += "☆";
    }
    return stars;
  };
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

  return (
    <>
      <Block color={colors.list}>
        <Block safe>
          <Block
            scroll
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: sizes.xs,
            }}
          >
            {/* Image */}
            <Image
              contentFit="cover"
              source={isDark ? assets.backgroundDark : assets.backgroundLight}
              height={200}
              margin={sizes.sm}
            />
            <Block
              row
              flex={0}
              marginBottom={sizes.s}
              marginHorizontal={sizes.sm}
            >
              <Text p transform="capitalize">
                Creating a pin for:
                {" • "}
                Hi
                {" • "}
                Hi
              </Text>
            </Block>

            {/* form inputs */}
            <Block paddingHorizontal={sizes.sm}>
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
              {/* Pin Visited */}
              <Block
                row
                marginTop={sizes.m * 1.1}
                flex={0}
                align="center"
                justify="space-around"
                paddingHorizontal={sizes.sm}
              >
                <Checkbox
                  checked={pinVisited}
                  onPress={() => setPinVisited(!pinVisited)}
                />
                <Text marginRight={sizes.s} marginTop={-2}>
                  I've been here
                </Text>
              </Block>

              <Input
                label="Review"
                marginBottom={sizes.sm}
                onChangeText={(text) => setReview(text)}
                value={review}
                autoCapitalize={"none"}
                placeholder="Enter Review"
                autoCorrect={false}
              />
              <Pressable onPressIn={() => setRatingModal(true)}>
                <Input
                  marginBottom={sizes.xs}
                  label="Rating"
                  onFocus={() => setRatingModal(true)}
                  disabled
                  value={rating ? displayStars(rating) : ""}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  inputMode="none"
                  placeholder="Choose Rating"
                />
              </Pressable>

              <Block
                row
                marginTop={sizes.m * 1.1}
                marginBottom={sizes.xs}
                flex={0}
                align="center"
                justify="space-around"
                paddingHorizontal={sizes.sm}
              >
                <Checkbox
                  checked={pinIsPrivate}
                  onPress={() => setPinIsPrivate(!pinVisited)}
                />
                <Text marginRight={sizes.s} marginTop={-2}>
                  This pin is private!
                </Text>
              </Block>
            </Block>

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
    </>
  );
}

interface ICreatePinValidation {
  pinName: boolean;
  reviewRating: boolean;
}

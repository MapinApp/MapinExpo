import React from "react";
import { Dimensions, StyleSheet, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useData, useTheme } from "../../hooks";
import { Block, Image, Text } from "../../components";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const CardScrollView = ({ markers, mapAnimation, ScrollViewRef }) => {
  const { colors, assets, sizes, gradients } = useTheme();
  const { isDark, handleIsDark } = useData();
  return (
    <>
      <Animated.ScrollView
        ref={ScrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        keyboardDismissMode="on-drag"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {markers.map((marker, index) => (
          <Block
            key={`cardScroll_${index}`}
            card={isDark ? false : true}
            cardDark={isDark ? true : false}
            style={styles.card}
            // height={CARD_HEIGHT}
            width={CARD_WIDTH}
          >
            {/* Image */}
            <Image
              height={CARD_HEIGHT * 0.5}
              resizeMode="cover"
              source={assets?.card4}
              style={styles.cardImage}
            />
            <Text
              paddingHorizontal={5}
              h2
              size={30}
              lineHeight={32}
              // transform="uppercase"
              numberOfLines={2}
              // gradient={gradients.primary}
              marginTop={18}
              marginBottom={5}
              marginLeft={3}
              center
              // start={{ x: 0.8, y: 0.5 }}
            >
              {marker.pin_name}
            </Text>

            <Block
              row
              align="center"
              center
              marginTop={sizes.s}
              marginBottom={sizes.xs}
            >
              <Ionicons
                name="ios-location-outline"
                size={20}
                // color='#4F5A6D'
                color={isDark ? colors.icon : "#475265"}
                style={{ marginRight: 2 }}
              />
              <Text p size={12}>
                {marker.postcode}
              </Text>
              <Text p marginHorizontal={sizes.s}>
                •
              </Text>
              <Ionicons
                name="ios-star-outline"
                size={20}
                color={isDark ? colors.icon : "#475265"}
                style={{ marginRight: 4 }}
              />
              <Text p size={12}>
                {marker.rating} / 5
              </Text>
              <Text p marginHorizontal={sizes.s}>
                •
              </Text>
              <Ionicons
                name="ios-chatbubbles-outline"
                size={20}
                color={isDark ? colors.icon : "#475265"}
                style={{ marginRight: 4 }}
              />
              <Text p size={12}>
                {220}
              </Text>
              <Text p marginHorizontal={sizes.s}>
                •
              </Text>
              <Ionicons
                name="ios-bookmark-outline"
                size={20}
                color={isDark ? colors.icon : "#475265"}
                style={{ marginRight: 4 }}
              />
              <Text p size={12}>
                35
              </Text>
            </Block>
          </Block>
        ))}
      </Animated.ScrollView>
    </>
  );
};

export default CardScrollView;

const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  endPadding: {
    paddingRight: Dimensions.get("window").width - CARD_WIDTH,
  },
  card: {
    marginBottom: 10,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
});

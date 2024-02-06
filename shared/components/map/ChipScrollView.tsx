import React from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks";
import { Text } from "../../components";

const ChipScrollView = () => {
  const { colors } = useTheme();
  const categories = [
    {
      name: "Fastfood",
      icon: (
        <Ionicons
          name="ios-restaurant"
          color={colors.icon}
          style={styles.chipsIcon}
          size={18}
        />
      ),
    },
    {
      name: "Restaurant",
      icon: (
        <Ionicons
          name="ios-restaurant"
          color={colors.icon}
          style={styles.chipsIcon}
          size={18}
        />
      ),
    },
    {
      name: "Dineouts",
      icon: (
        <Ionicons
          name="ios-restaurant"
          color={colors.icon}
          style={styles.chipsIcon}
          size={18}
        />
      ),
    },
    {
      name: "Snacks",
      icon: (
        <Ionicons
          name="ios-restaurant"
          color={colors.icon}
          style={styles.chipsIcon}
          size={18}
        />
      ),
    },
    {
      name: "Hotel",
      icon: (
        <Ionicons
          name="ios-restaurant"
          color={colors.icon}
          style={styles.chipsIcon}
          size={18}
        />
      ),
    },
  ];

  return (
    <>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 10,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 10 : 0,
        }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.chipsItem, { backgroundColor: colors.card }]}
          >
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default ChipScrollView;

const styles = StyleSheet.create({
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 5,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
  },
  chipsIcon: {
    marginRight: 8,
    marginTop: 1,
  },
});

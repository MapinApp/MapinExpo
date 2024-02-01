import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
// Components
import { useTheme } from "@/context/theme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  size: number;
}) {
  return <Ionicons style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { theme, isDark } = useTheme();
  const { colors } = theme;

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Tabs
        detachInactiveScreens={true}
        screenOptions={{
          // stop moving for keyboard
          tabBarHideOnKeyboard: true,
          // hide header
          headerShown: true,
          // background color of tab bar
          tabBarActiveTintColor: String(colors.white),
          tabBarInactiveTintColor: String(colors.gray),
          // remove labels
          tabBarLabelStyle: { display: "none" },
          tabBarActiveBackgroundColor: String(colors.primary),
          tabBarItemStyle: {
            borderRadius: 5,
            marginVertical: 6,
            marginHorizontal: 6,
          },
          tabBarStyle: {
            // backgroundColor: "rgba(27, 29, 34, 0.95)",
            backgroundColor: String(colors.background),
            borderTopWidth: 0.5,
            borderTopColor: String(colors.border),
            // borderColor: String(colors.tertiary),
            height: 80,
            paddingTop: 10,
            paddingBottom: 10,
            paddingHorizontal: 15,
          },
          headerStyle: {
            backgroundColor: String(colors.background),
            borderBottomWidth: 0.5,
            borderBottomColor: String(colors.border),
            // shadowColor: "transparent",
          },
          headerTitleStyle: {
            color: String(colors.text),
            fontFamily: "MontserratRegular",
          },

          // Set Dark Status Bar
        }}
      >
        {/* Order of the tabs */}

        <Tabs.Screen
          name="index"
          options={{
            // This tab will no longer show up in the tab bar.
            href: null,
          }}
        />

        <Tabs.Screen
          name="one"
          options={{
            // set as initial tab
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="two"
          options={{
            tabBarLabel: "Map",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name={focused ? "map" : "map-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="three"
          options={{
            tabBarLabel: "Add Pin",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name={focused ? "location" : "location-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="four"
          options={{
            tabBarLabel: "Lists",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name={focused ? "albums" : "albums-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="five"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
        name="one"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
          tabBarLabel: "Components",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "logo-android" : "logo-android"}
              color={color}
              size={size}
            />
          ),
        }}
      /> */}
      </Tabs>
    </>
  );
}

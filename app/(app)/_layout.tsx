import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
// Components
import { useTheme } from "@/context/theme";
import { useAuth } from "@/context/auth";
import { Text } from "@/components/ui";

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
  const { session, isLoading } = useAuth();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }

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
            shadowColor: "transparent",
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
          name="components"
          options={{
            // This tab will no longer show up in the tab bar.
            // href: null,
            tabBarLabel: "Components",
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon
                name={focused ? "logo-codepen" : "logo-codepen"}
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="home"
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
          name="map"
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
          name="add-pin"
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
          name="lists"
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
          name="profile"
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
      </Tabs>
    </>
  );
}

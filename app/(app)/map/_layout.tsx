import React from "react";
import { Stack } from "expo-router";
// Components
import { Block } from "@/components/ui";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/context/theme";

export default function Layout() {
  const { theme, isDark } = useTheme();
  const { colors } = theme;

  return (
    <>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={String(colors.background)}
      />
      {/* Add view so it doesn't flicker white between screens. */}
      <Block background flex={1} justify={"center"}>
        <Stack
          screenOptions={{
            // hide header
            headerShown: false,
          }}
        />
      </Block>
    </>
  );
}

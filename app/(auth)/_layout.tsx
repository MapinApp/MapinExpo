import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "@/context/theme";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const { theme, isDark } = useTheme();
  const { colors } = theme;
  return (
    <>
      {/* Add view so it doesn't flicker white between screens. */}
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Stack
          screenOptions={{
            // hide header
            headerShown: false,
          }}
        />
      </View>
    </>
  );
}

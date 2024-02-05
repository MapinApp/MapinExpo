import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "@/context/theme";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const { theme, isDark } = useTheme();
  const { colors } = theme;

  return (
    <>
      {/* Component and imperative interface to control the app status bar to change its text color, background color */}
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={String(colors.background)}
      />
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

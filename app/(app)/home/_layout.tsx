import { Stack } from "expo-router";
// Components
import { useTheme } from "@/context/theme";
import { Block } from "@/components/ui";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const { isDark } = useTheme();
  return (
    <>
      {/* Add view so it doesn't flicker white between screens. */}
      <StatusBar style={isDark ? "light" : "dark"} />
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

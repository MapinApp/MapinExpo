import { Stack } from "expo-router";
// Components
import { Block } from "@/components/ui";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="transparent" />
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

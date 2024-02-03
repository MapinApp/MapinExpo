import { Stack, Redirect } from "expo-router";
// Components
import { Block } from "@/components/ui";

export default function Layout() {
  return (
    <>
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

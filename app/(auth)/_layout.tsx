import { Stack, Redirect } from "expo-router";
// Components
import { Block } from "@/components/ui";
import { useAuth } from "@/context/auth";

export default function Layout() {
  const { session, isLoading } = useAuth();
  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(app)/home" />;
  }

  return (
    <>
      {/* Add view so it doesn't flicker white between screens. */}
      <Block background flex={1}>
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

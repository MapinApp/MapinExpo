import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
// Migrated
import { ThemeProvider } from "@/context/theme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(app)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../shared/assets/fonts/SpaceMono-Regular.ttf"),
    Manophiser: require("../shared/assets/fonts/Manophiser.otf"),
    MontserratItalic: require("../shared/assets/fonts/Montserrat-Italic.otf"),
    MontserratThin: require("../shared/assets/fonts/Montserrat-Thin.otf"),
    MontserratBlack: require("../shared/assets/fonts/Montserrat-Black.otf"),
    MontserratMedium: require("../shared/assets/fonts/Montserrat-Medium.otf"),
    MontserratBold: require("../shared/assets/fonts/Montserrat-Bold.otf"),
    MontserratRegular: require("../shared/assets/fonts/Montserrat-Regular.otf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}

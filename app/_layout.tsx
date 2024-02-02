import { useFonts } from "expo-font";
import { Stack, SplashScreen, Slot } from "expo-router";
import { useEffect } from "react";
import { ThemeProvider } from "@/context/theme";
import { AuthProvider } from "@/context/auth";

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
    MontserratBlack: require("../shared/assets/fonts/Montserrat-Black.otf"),
    MontserratMedium: require("../shared/assets/fonts/Montserrat-Medium.otf"),
    MontserratBold: require("../shared/assets/fonts/Montserrat-Bold.otf"),
    MontserratRegular: require("../shared/assets/fonts/Montserrat-Regular.otf"),
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
    // The native splash screen will stay visible for as long as there
    // are `<SplashScreen />` components mounted. This component can be nested.
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // Render the children routes now that all the assets are loaded.
  return (
    // Setup the auth context and render our layout inside of it.
    <AuthProvider>
      <ThemeProvider>
        {/* <Slot /> will render the selected child route. This component can be wrapped with other components to create a layout. */}
        <Slot />
      </ThemeProvider>
    </AuthProvider>
  );
}

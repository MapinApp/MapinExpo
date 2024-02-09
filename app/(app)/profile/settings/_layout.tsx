import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "@/context/theme";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/ui";
import { useRouter } from "expo-router";

export default function Layout() {
  const { theme, isDark } = useTheme();
  const { colors } = theme;
  const router = useRouter();
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
            headerShown: true,
            headerTitleStyle: {
              color: String(colors.text),
              fontFamily: "MontserratRegular",
            },
            title: "Settings",
            headerStyle: {
              backgroundColor: String(colors.background),
            },
            headerLeft: () => (
              <Button
                onPress={() => {
                  router.back();
                }}
                marginRight={6}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={16}
                  color={colors.text}
                />
              </Button>
            ),
          }}
        />
      </View>
    </>
  );
}

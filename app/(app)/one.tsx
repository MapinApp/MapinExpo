import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Text } from "@/components/ui";
import { Link } from "expo-router";
// import { Link, Tabs } from "expo-router";
import { useTheme } from "@/context/theme";

export default function Details() {
  const { theme, isDark, handleIsDark } = useTheme();

  const { colors, gradients } = theme;
  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <View style={[styles.container]}>
        <Text h1 underline uppercase gradient={gradients.primary}>
          Mapin
        </Text>
        <View style={styles.main}>
          <Pressable
            onPress={() => {
              handleIsDark();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "transparent",
              },
            ]}
          >
            <Text h5>Toggle Dark: {JSON.stringify(isDark)}</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              console.log("Hello");
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "transparent",
              },
            ]}
          >
            <Text h5>Call Log()</Text>
          </Pressable>

          {/* <Link href="/profile">
            <Text h5>Go to Profile</Text>{" "}
          </Link> */}
        </View>

        {/* prettier-ignore */}
        <View style={styles.container}>
        <Text h1> This is h1</Text>
        <Text h2> This is h2</Text>
        <Text h3> This is h3</Text>
        <Text h4> This is h4</Text>
        <Text h5> This is h5</Text>
        <Text p> This is p</Text>
        <Text h3 italic size={52} lineHeight={52}> This is custom h3</Text>
        <Text h3 primary>Primary</Text>
        <Text h3 secondary>Secondary</Text>
        <Text h3 tertiary>Tertiary</Text>
        <Text h3 black>Black</Text>
        <Text h3 white> white </Text>
        <Text h3 gray> gray </Text>
        <Text h3 danger> danger </Text>
        <Text h3 warning> warning </Text>
        <Text h3 success> success </Text>
        <Text h3 gradient={gradients.primary}>G Primary</Text>
        <Text h3 gradient={gradients.secondary}>G Secondary</Text>
        <Text h3 gradient={gradients.success}>G Success</Text>
        <Text h3 gradient={gradients.warning}>G Warning</Text>
        <Text h3 gradient={gradients.danger}>G Danger</Text>
        <Text h3 gradient={gradients.black}>G Black</Text>
        <Text h3 gradient={gradients.white}>G White</Text>
        <Text h3 gradient={gradients.dark}>G Dark</Text>
        <Text h3 gradient={gradients.light}>G Light</Text>
        <Text h3 gradient={gradients.info}>G Info</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    marginTop: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontFamily: "JosefinSansRegularItalic",
    color: "#38434D",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

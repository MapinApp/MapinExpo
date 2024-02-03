import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Details() {
  const router = useRouter();
  return (
    <View>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Lists Screen
      </Text>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Lists Screen
      </Text>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Lists Screen
      </Text>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Lists Screen
      </Text>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Lists Screen
      </Text>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Lists Screen
      </Text>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Lists Screen
      </Text>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Lists Screen
      </Text>
      <Text
        onPress={() => {
          router.back();
        }}
      >
        Lists Screen
      </Text>
    </View>
  );
}

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
        Add Pin Screen
      </Text>
    </View>
  );
}

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Alert, ActivityIndicator } from "react-native";
import { useTheme } from "@/context/theme";
import { Button, Text, Block, Input } from "@/components/ui";
import { useAuth } from "@/context/auth";
import { useRouter } from "expo-router";

// Feedback
const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { session } = useAuth();
  const { theme, isDark, handleIsDark } = useTheme();
  const { sizes, gradients } = theme;
  const router = useRouter();

  async function sendFeedback({ feedback }: { feedback: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        user_id: session?.user.id,
        message: feedback,
        dt: new Date(),
      };

      const { error } = await supabase.from("feedback").insert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Block marginBottom={sizes.xs} list>
      <Text p semibold marginBottom={sizes.s}>
        Feedback
      </Text>
      <Text p marginBottom={sizes.s}>
        Have feedback for us? We'd love to hear from you! Fill out the form
        below with ideas, bugs or even features and improvements you'd like to
        see.
      </Text>

      <Block>
        <Input
          value={feedback || ""}
          onChangeText={(text) => setFeedback(text)}
        />
        <Button
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            sendFeedback({ feedback });
            router.back();
          }}
          marginBottom={sizes.s}
          marginTop={sizes.sm}
          marginHorizontal={sizes.sm}
          gradient={gradients.primary}
          // Disable on loading
          disabled={loading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text medium size={sizes.p} white uppercase>
              Send Feedback
            </Text>
          )}
        </Button>
      </Block>
    </Block>
  );
};

export default function Components() {
  const { theme } = useTheme();
  const { colors, sizes } = theme;

  return (
    <Block color={colors.list}>
      <Block safe>
        <Block
          scroll
          showsVerticalScrollIndicator={false}
          paddingVertical={sizes.xs}
        >
          <Block>
            <Feedback />
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

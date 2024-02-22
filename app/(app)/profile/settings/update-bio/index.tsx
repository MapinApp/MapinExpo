import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { View, Alert, ActivityIndicator } from "react-native";
import { useTheme } from "@/context/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image, Button, Text, Block, Input } from "@/components/ui";
import { useAuth } from "@/context/auth";
import { useRouter } from "expo-router";

// Profile Settings
const Profile = () => {
  const [bio, setBio] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { session } = useAuth();
  const { theme, isDark, handleIsDark } = useTheme();
  const { sizes, gradients } = theme;
  const router = useRouter();

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`bio`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data && data.bio) {
        setBio(data.bio);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateBio({ bio }: { bio: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        bio,
        updated_at: new Date().toISOString(), // Convert to string
      };

      const { error } = await supabase.from("profiles").upsert(updates);

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

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  return (
    <Block marginBottom={sizes.xs} list>
      <Text p semibold marginBottom={sizes.s}>
        Update Bio
      </Text>

      <Block>
        <Input
          value={bio || ""}
          onChangeText={(text) => setBio(text)}
          multiline={true}
          numberOfLines={20}
        />
        <Button
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            updateBio({ bio });
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
              Update
            </Text>
          )}
        </Button>
      </Block>
    </Block>
  );
};

export default function Components() {
  const { theme, isDark } = useTheme();
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
            <Profile />
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

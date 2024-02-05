import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { View } from "react-native";
import { Image } from "@/components/ui";
import { useAuth } from "@/context/auth";
import { Alert } from "react-native";
import { useTheme } from "@/context/theme";

export default function ProfilePicture() {
  const { session } = useAuth();
  const [avatarPath, setAvatarPath] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { assets } = theme;

  async function getUrl() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setAvatarPath(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  useEffect(() => {
    if (session) getUrl();
    if (avatarPath) downloadImage(avatarPath);
  }, [session, avatarPath]);

  return (
    <View>
      {avatarUrl ? (
        <Image avatar source={{ uri: avatarUrl }} accessibilityLabel="Avatar" />
      ) : (
        <Image
          avatar
          source={assets.profilePicture}
          accessibilityLabel="AvatarPlaceHolder"
        />
      )}
    </View>
  );
}

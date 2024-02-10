import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { View, Alert, ActivityIndicator } from "react-native";
import { Image, Button, Text, Block } from "@/components/ui";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/auth";
import { useTheme } from "@/context/theme";

export default function Avatar() {
  const { session } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [avatarPath, setAvatarPath] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { assets, sizes, gradients, colors } = theme;

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

  async function uploadAvatar() {
    try {
      setUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1,
        aspect: [1, 1],
        exif: false, // We don't want nor need that data.
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];
      console.log("Got image", image);

      if (!image.uri) {
        throw new Error("No image uri!"); // Realistically, this should never happen, but just in case...
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}-${session?.user.id}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }
      setAvatarPath(data?.path);
      updateAvatarSupabase({ avatar_url: data?.path });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  async function updateAvatarSupabase({ avatar_url }: { avatar_url: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        avatar_url,
        updated_at: new Date().toISOString(), // Convert Date to string
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

  return (
    <View>
      <Block row center justify="center">
        {avatarUrl ? (
          <Image
            largeAvatar
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
          />
        ) : (
          <Image
            largeAvatar
            source={assets.profilePicture}
            accessibilityLabel="AvatarPlaceHolder"
          />
        )}
      </Block>
      <View>
        <Block
          row
          flex={0}
          align="center"
          justify="space-between"
          paddingTop={sizes.m}
        >
          <Text>Update Display Picture</Text>
          {uploading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Button
              onPress={() => {
                uploadAvatar();
              }}
              disabled={uploading}
              chit
            >
              <Ionicons
                name="cloud-upload-outline"
                size={18}
                color={colors.text}
              />
            </Button>
          )}
        </Block>
      </View>
    </View>
  );
}

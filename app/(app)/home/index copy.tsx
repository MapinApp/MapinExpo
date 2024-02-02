import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useTheme } from "@/context/theme";
import Avatar from "@/components/UploadWidget";
import { useAuth } from "@/context/auth";
import { supabase } from "@/lib/supabase";
import {
  Block,
  Button,
  Input,
  Image,
  Switch,
  Modal,
  Text,
} from "@/components/ui";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { session, signOut } = useAuth();
  const { theme, isDark, handleIsDark } = useTheme();
  const { assets, colors, gradients, sizes } = theme;

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
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
    <Block background>
      <Block safe>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        />
        <Block margin={sizes.xs} card>
          <Block>
            <Input
              label="Email"
              value={session?.user?.email}
              disabled
              marginBottom={50}
            />
            <Input
              label="Username"
              value={username || ""}
              onChangeText={(text) => setUsername(text)}
              marginBottom={50}
            />
            <Input
              label="Website"
              value={website || ""}
              onChangeText={(text) => setWebsite(text)}
              marginBottom={50}
            />
          </Block>

          <Button
            onPress={() =>
              updateProfile({ username, website, avatar_url: avatarUrl })
            }
            disabled={loading}
            marginBottom={sizes.s}
            marginTop={sizes.sm}
            marginHorizontal={sizes.sm}
            gradient={gradients.primary}
          >
            <Text medium size={sizes.p} white uppercase>
              {loading ? "Loading ..." : "Update"}
            </Text>
          </Button>
          <Button
            onPress={() => {
              // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
              signOut();
            }}
            marginBottom={sizes.s}
            marginTop={sizes.sm}
            marginHorizontal={sizes.sm}
            gradient={gradients.primary}
          >
            <Text medium size={sizes.p} white uppercase>
              Sign Out
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
}

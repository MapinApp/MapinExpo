import { useState, useEffect, useCallback } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useTheme } from "@/context/theme";
import { useAuth } from "@/context/auth";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import {
  Block,
  Button,
  Input,
  Image,
  Switch,
  Modal,
  Text,
} from "@/components/ui";
import Constants from "expo-constants";
import ProfilePicture from "@/components/ProfilePicture";

const lists = "lists";
const reviews = "Reviews";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [tab, setTab] = useState<number>(0);
  const [Page, setPage] = useState(lists);

  const handlePage = useCallback(
    (tab: number) => {
      setTab(tab);
      setPage(tab === 0 ? lists : reviews);
    },
    [lists, reviews, setTab, setPage]
  );

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
        .select(`username, bio`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
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

  return (
    <Block safe>
      <Block
        flex={1}
        justify="flex-start"
        align="center"
        color={colors.background}
      >
        {/* Top Coloured Section */}
        <Block
          flex={0}
          width={"100%"}
          height={"50%"}
          overflow="hidden"
          justify="flex-start"
          align="flex-start"
        >
          <Block
            background
            paddingTop={Constants.statusBarHeight}
            justify="flex-start"
            align="flex-start"
          >
            {/* Navigation Icons */}
            <Block
              flex={0}
              width={"100%"}
              height={"10%"}
              row
              align="center"
              justify={"space-between"}
            >
              <Button
                onPress={() => {
                  console.log("Go back");
                }}
              >
                <Ionicons name="chevron-back-outline" size={16} color="white" />
              </Button>
              <Button
                onPress={() => {
                  handleIsDark();
                }}
              >
                <Ionicons name="settings" size={16} color="white" />
              </Button>
            </Block>
            <Block
              flex={0}
              width={"100%"}
              height={"20%"}
              row
              align="center"
              justify={"space-around"}
              paddingHorizontal={sizes.sm}
            >
              <ProfilePicture />
              <Block align="center">
                <Text white h4>
                  50
                </Text>
                <Text white p>
                  Pins
                </Text>
              </Block>
              <Block align="center">
                <Text white h4>
                  50
                </Text>
                <Text white p>
                  Follows
                </Text>
              </Block>
              <Block align="center">
                <Text white h4>
                  50
                </Text>
                <Text white p>
                  Following
                </Text>
              </Block>
            </Block>

            <Block
              flex={0}
              width={"100%"}
              height={"55%"}
              align="center"
              justify={"flex-start"}
              paddingTop={sizes.sm}
              paddingBottom={sizes.m}
              paddingHorizontal={sizes.sm}
            >
              <Block
                blur
                width={"100%"}
                height={"100%"}
                flex={0}
                intensity={20}
                radius={sizes.sm}
                overflow="hidden"
                tint={colors.blurTint}
                justify="flex-start"
                align="flex-start"
                paddingVertical={sizes.sm}
                renderToHardwareTextureAndroid
                padding={sizes.sm}
              >
                <Block
                  flex={0}
                  width={"100%"}
                  row
                  align="center"
                  justify={"space-between"}
                >
                  <Text h4 white bold size={14}>
                    @{username}
                  </Text>
                  <Text white p>
                    {session?.user.user_metadata.first_name}{" "}
                    {session?.user.user_metadata.last_name}
                  </Text>
                </Block>
                <Block scroll>
                  <Text white p>
                    {bio}
                  </Text>
                </Block>
              </Block>
            </Block>
            <Block
              width={"100%"}
              height={"10%"}
              row
              flex={0}
              align="center"
              justify="space-around"
            >
              <Button onPress={() => handlePage(0)}>
                <Block row align="center">
                  <Block
                    flex={0}
                    radius={6}
                    align="center"
                    justify="center"
                    marginRight={sizes.s}
                    width={sizes.socialIconSize}
                    height={sizes.socialIconSize}
                    {...(tab === 0 && { gradient: gradients.primary })}
                  >
                    <Ionicons name="list" size={20} color="white" />
                  </Block>
                </Block>
              </Button>

              <Button onPress={() => handlePage(1)}>
                <Block row align="center">
                  <Block
                    flex={0}
                    radius={6}
                    align="center"
                    justify="center"
                    marginRight={sizes.s}
                    width={sizes.socialIconSize}
                    height={sizes.socialIconSize}
                    {...(tab === 1 && { gradient: gradients.primary })}
                  >
                    <Ionicons name="star" size={20} color="white" />
                  </Block>
                </Block>
              </Button>
            </Block>
          </Block>
          {/* Content here */}
          <Text p>{Page}</Text>
        </Block>
      </Block>
    </Block>
  );
}

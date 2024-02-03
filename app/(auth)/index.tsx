import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

import { Block, Button, Input, Image, Text } from "@/components/ui";
import { useAuth } from "@/context/auth";
import { useTheme } from "@/context/theme";
import * as regex from "@/lib/regex";

const isAndroid = Platform.OS === "android";

export default function LogIn() {
  const { signIn, isLoading } = useAuth();
  const { theme } = useTheme();
  const { colors, sizes, assets, gradients } = theme;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
  });

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(email),
    }));
  }, [email, setIsValid]);

  const handleSignIn = () => {
    if (isValid.email && !isLoading) {
      signIn({ email, password });
    } else {
      if (!isValid.email) {
        alert("Seems your Email isn't valid...");
      }
    }
  };

  return (
    <>
      <Block background>
        <Block safe paddingVertical={"15%"} paddingHorizontal={"10%"}>
          {/* login form */}
          <Block
            card
            outlined
            flex={0}
            radius={sizes.cardRadius}
            overflow="hidden"
            justify="space-evenly"
            paddingVertical={sizes.sm}
            shadow={true}
            height={"100%"}
            width={"100%"}
            marginTop={sizes.sm}
          >
            <Block flex={0}>
              <Block
                row
                center
                justify="center"
                align="center"
                paddingVertical={"20%"}
                marginBottom={sizes.sm}
              >
                <Image
                  padding={sizes.sm}
                  source={assets.logo}
                  height={90}
                  width={90}
                />
              </Block>
              <Block scroll flex={0}>
                <Text medium p center>
                  Sign in with
                </Text>

                {/* social buttons */}
                <Block
                  row
                  center
                  justify="space-evenly"
                  marginVertical={sizes.m}
                >
                  <Button
                    gradient={gradients.primary}
                    shadow={!isAndroid}
                    onPress={() => console.log("facebook")}
                  >
                    <Ionicons name="logo-facebook" size={24} color="white" />
                  </Button>
                  <Button
                    gradient={gradients.primary}
                    white
                    shadow={!isAndroid}
                    onPress={() => console.log("apple")}
                  >
                    <Ionicons name="logo-apple" size={24} color="white" />
                  </Button>
                  <Button
                    gradient={gradients.primary}
                    white
                    shadow={!isAndroid}
                    onPress={() => console.log("google")}
                  >
                    <Ionicons name="logo-google" size={24} color="white" />
                  </Button>
                </Block>
                <Block
                  row
                  flex={0}
                  align="center"
                  justify="center"
                  marginBottom={sizes.sm}
                  paddingHorizontal={sizes.xxl}
                >
                  <Block
                    flex={0}
                    height={1}
                    width="50%"
                    end={[1, 0]}
                    start={[0, 1]}
                    gradient={gradients.divider}
                  />
                  <Text
                    center
                    marginBottom={sizes.s * 0.9}
                    marginHorizontal={sizes.s}
                  >
                    or
                  </Text>

                  <Block
                    flex={0}
                    height={1}
                    width="50%"
                    end={[0, 1]}
                    start={[1, 0]}
                    gradient={gradients.divider}
                  />
                </Block>
                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm}>
                  <Input
                    label="Email"
                    marginBottom={sizes.sm}
                    success={Boolean(email && isValid.email)}
                    danger={Boolean(email && !isValid.email)}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize={"none"}
                    keyboardType="email-address"
                    placeholder="Enter email address"
                    autoCorrect={false}
                    autoComplete="email"
                  />
                  <Input
                    secureTextEntry
                    label="Password"
                    value={password}
                    marginBottom={sizes.xs}
                    autoCorrect={false}
                    // success={Boolean(password && isValid.password)}
                    // danger={Boolean(password && !isValid.password)}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize={"none"}
                    placeholder="Enter password"
                  />
                </Block>

                <Button
                  onPress={() => handleSignIn()}
                  disabled={!isValid.email || isLoading}
                  marginBottom={sizes.s}
                  marginTop={sizes.sm}
                  marginHorizontal={sizes.sm}
                  gradient={gradients.primary}
                >
                  <Text medium size={sizes.p} white uppercase>
                    {isLoading ? "Loading ..." : "Sign In"}
                  </Text>
                </Button>

                <Button
                  primary
                  outlined
                  shadow={!isAndroid}
                  marginVertical={sizes.s}
                  marginHorizontal={sizes.sm}
                  onPress={() => router.push("/sign-up/1-details")}
                >
                  <Text medium size={sizes.p} primary uppercase>
                    Sign Up
                  </Text>
                </Button>
                <Button onPress={() => router.push("/forgot-password")}>
                  <Text p>Forgot Password?</Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </>
  );
}

interface ILoginValidation {
  email: boolean;
}

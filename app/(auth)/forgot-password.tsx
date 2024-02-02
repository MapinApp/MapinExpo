import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
// Custom
import { Block, Button, Input, Image, Text } from "@/components/ui";
import { useAuth } from "@/context/auth";
import { useTheme } from "@/context/theme";
import * as regex from "@/lib/regex";

const isAndroid = Platform.OS === "android";

export default function ForgotPassword() {
  const router = useRouter();
  const { resetPassword, isLoading } = useAuth();
  const { theme } = useTheme();
  const { colors, sizes, assets, gradients } = theme;

  const [email, setEmail] = useState("");

  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
  });

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(email),
    }));
  }, [email, setIsValid]);

  const ForgotPassManageDisabled = () => {
    if (isValid.email && !isLoading) {
      resetPassword({ email });
    } else {
      if (!isValid.email) {
        alert("Seems your Email isn't valid...");
      }
    }
  };

  return (
    <>
      <Block color={colors.background}>
        <Block safe marginTop={sizes.l} paddingHorizontal={sizes.s}>
          <Block flex={0} style={{ zIndex: 0 }}>
            <Image
              background
              contentFit="cover"
              padding={sizes.sm}
              radius={sizes.blockRadius}
              source={assets.og}
              height={sizes.height * 0.2}
            >
              <Text h1 center white size={sizes.h1 * 1.2} marginTop={sizes.sm}>
                Whoops!
              </Text>
            </Image>
          </Block>
          {/* Forgot Password form */}
          <Block scroll marginTop={-(sizes.height * 0.11 - sizes.l)}>
            <Block
              flex={0}
              radius={sizes.blockRadius}
              marginHorizontal="8%"
              shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            >
              <Block
                outlined
                blur
                flex={0}
                intensity={90}
                radius={sizes.blockRadius}
                overflow="hidden"
                justify="space-evenly"
                tint={colors.blurTint}
                paddingVertical={sizes.sm}
              >
                <Text p center medium>
                  Forgotten your Password?
                </Text>

                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm} marginTop={sizes.sm}>
                  <Input
                    label="Email"
                    marginBottom={sizes.xl}
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
                </Block>

                <Button
                  onPress={() => {
                    ForgotPassManageDisabled();
                  }}
                  marginVertical={sizes.s}
                  marginHorizontal={sizes.sm}
                  gradient={gradients.primary}
                  disabled={Object.values(isValid).includes(false) || isLoading}
                >
                  <Text medium size={sizes.p} white uppercase>
                    {isLoading ? "Loading" : "Send email"}
                  </Text>
                </Button>

                <Button onPress={() => router.back()}>
                  <Text p>Login Instead</Text>
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

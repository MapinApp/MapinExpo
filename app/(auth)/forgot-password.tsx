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
      <Block background>
        <Block safe paddingVertical={"15%"} paddingHorizontal={"10%"}>
          {/* login form */}
          <Block
            card
            outlined
            flex={0}
            radius={sizes.cardRadius}
            overflow="hidden"
            justify="flex-start"
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
                  height={130}
                  width={130}
                  disableTransition={true}
                />
              </Block>
              <Block scroll flex={0} marginBottom={"45%"}>
                <Text p center medium>
                  Forgotten your Password?
                </Text>

                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm} marginTop={sizes.sm}>
                  <Input
                    label="Email"
                    marginBottom={sizes.xs}
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
                  marginBottom={sizes.s}
                  marginTop={sizes.sm}
                  marginHorizontal={sizes.sm}
                  gradient={gradients.primary}
                  disabled={Object.values(isValid).includes(false) || isLoading}
                >
                  <Text medium size={sizes.p} white uppercase>
                    {isLoading ? "Loading" : "Send email"}
                  </Text>
                </Button>

                <Button onPress={() => router.back()}>
                  <Text p underline primary>
                    Login Instead
                  </Text>
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

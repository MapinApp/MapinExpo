import React from "react";
import { Platform } from "react-native";
import { useRouter } from "expo-router";

import { Block, Button, Image, Text } from "@/components/ui";
import { useTheme } from "@/context/theme";

const isAndroid = Platform.OS === "android";

export default function DobWhy() {
  const router = useRouter();
  const { theme } = useTheme();

  const { colors, sizes, assets } = theme;
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
              height={sizes.height * 0.3}
            >
              <Text h1 center white size={sizes.h1 * 1.2} marginTop={sizes.m}>
                Join Mapin
              </Text>
            </Image>
          </Block>
          {/* login form */}
          <Block scroll marginTop={-(sizes.height * 0.2 - sizes.l)}>
            <Block
              flex={0}
              radius={sizes.blockRadius}
              marginHorizontal="8%"
              shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            >
              <Block
                blur
                outlined
                flex={0}
                intensity={90}
                radius={sizes.blockRadius}
                overflow="hidden"
                justify="space-evenly"
                tint={colors.blurTint}
                paddingVertical={sizes.sm}
              >
                <Text medium h4 center paddingHorizontal={sizes.sm}>
                  Why do we need your Birthday?
                </Text>
                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm}>
                  <Text marginBottom={sizes.sm} marginTop={sizes.sm}>
                    At Mapin, we take the safety and privacy of our users very
                    seriously. That's why we require all users to be at least 13
                    years old in order to create an account on our platform.
                    This is not only a legal requirement, but also helps us to
                    provide age-appropriate content and features to our users.{" "}
                  </Text>
                  <Text marginBottom={sizes.sm}>
                    By providing your date of birth, we can tailor our services
                    to your specific age group and interests. It also helps us
                    to ensure that all users are old enough to use our platform
                    and that we are in compliance with applicable laws and
                    regulations.
                  </Text>
                  <Text marginBottom={sizes.sm}>
                    Rest assured that we will never share your personal
                    information with third parties without your consent. Your
                    privacy is our top priority, and we will do everything we
                    can to keep your information secure while providing you with
                    the best possible experience on Mapin.
                  </Text>
                </Block>

                <Button onPress={() => router.back()}>
                  <Text p>Go back</Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </>
  );
}

import React from "react";
import { useRouter } from "expo-router";
import { Block, Button, Text } from "@/components/ui";
import { useTheme } from "@/context/theme";

export default function DobWhy() {
  const router = useRouter();
  const { theme } = useTheme();
  const { sizes } = theme;
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
              <Block scroll flex={0}>
                <Text h3 center size={16} lineHeight={35} uppercase>
                  Why do we need your Birthday?
                </Text>
                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm}>
                  <Text p marginBottom={sizes.sm} marginTop={sizes.sm}>
                    At Mapin, we take the safety and privacy of our users very
                    seriously. That's why we require all users to be at least 13
                    years old in order to create an account on our platform.
                    This is not only a legal requirement, but also helps us to
                    provide age-appropriate content and features to our users.{" "}
                  </Text>
                  <Text p marginBottom={sizes.sm}>
                    By providing your date of birth, we can tailor our services
                    to your specific age group and interests. It also helps us
                    to ensure that all users are old enough to use our platform
                    and that we are in compliance with applicable laws and
                    regulations.
                  </Text>
                  <Text p marginBottom={sizes.sm}>
                    Rest assured that we will never share your personal
                    information with third parties without your consent. Your
                    privacy is our top priority, and we will do everything we
                    can to keep your information secure while providing you with
                    the best possible experience on Mapin.
                  </Text>
                </Block>

                <Button onPress={() => router.back()}>
                  <Text p underline primary>
                    Go back
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

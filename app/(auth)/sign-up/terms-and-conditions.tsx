import React from "react";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
// Custom
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
                marginBottom={sizes.m}
              >
                <Text medium h4 center paddingHorizontal={sizes.sm}>
                  Terms & Conditions
                </Text>
                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm}>
                  <Text marginBottom={sizes.sm} marginTop={sizes.sm}>
                    Welcome to Mapin! Please read these Terms and Conditions
                    carefully as they govern your use of our app. By using
                    Mapin, you are agreeing to these Terms and Conditions, which
                    constitute a binding agreement between you and Mapin.{" "}
                  </Text>
                  <Text underline semibold>
                    1. Use of Mapin{" "}
                  </Text>

                  <Text marginBottom={sizes.sm}>
                    a. Location Data: Mapin collects your location data to show
                    you pins of nearby locations. We only use your location data
                    for this purpose, and we do not share your location data
                    with any third party for any other purpose. {"\n"}
                    b. User Conduct: You must use Mapin in accordance with
                    applicable laws and regulations. You agree not to use Mapin
                    for any unlawful purpose or in any way that could damage,
                    disable, overburden, or impair our app.{"\n"}
                    c. Content: You are solely responsible for any content that
                    you post on Mapin. You warrant that any content that you
                    post on Mapin does not infringe the intellectual property
                    rights of any third party.
                  </Text>

                  <Text underline semibold>
                    2. Disclaimer of Warranties
                  </Text>
                  <Text marginBottom={sizes.sm}>
                    Mapin is provided on an "as is" and "as available" basis. We
                    do not make any warranties or representations of any kind,
                    express or implied, including but not limited to warranties
                    of merchantability, fitness for a particular purpose,
                    non-infringement, or compatibility.
                  </Text>
                  <Text underline semibold>
                    3. Limitation of Liability
                  </Text>
                  <Text marginBottom={sizes.sm}>
                    To the extent permitted by law, Mapin shall not be liable
                    for any direct, indirect, incidental, special, or
                    consequential damages arising out of or in any way connected
                    with the use of Mapin, including but not limited to damages
                    for loss of profits, use, data, or other intangible losses.
                  </Text>
                  <Text underline semibold>
                    4. Indemnification
                  </Text>
                  <Text marginBottom={sizes.sm}>
                    You agree to indemnify and hold harmless Mapin, its
                    officers, directors, employees, and agents, from any claims,
                    actions, suits, or proceedings, arising out of or in any way
                    connected with your use of Mapin.
                  </Text>
                  <Text underline semibold>
                    5. Governing Law
                  </Text>
                  <Text marginBottom={sizes.sm}>
                    These terms and conditions shall be governed by and
                    construed in accordance with the laws of the United Kingdom.
                  </Text>
                  <Text underline semibold>
                    6. Modification of Terms and Conditions
                  </Text>
                  <Text marginBottom={sizes.sm}>
                    Mapin reserves the right to modify these terms and
                    conditions at any time. Your continued use of Mapin after
                    any modification constitutes your acceptance of the modified
                    terms and conditions.
                  </Text>
                  <Text underline semibold>
                    7. Termination
                  </Text>
                  <Text marginBottom={sizes.sm}>
                    Mapin may terminate your access to the app at any time,
                    without notice and for any reason, including but not limited
                    to your violation of these terms and conditions.
                  </Text>
                  <Text underline semibold>
                    8. Contact Us
                  </Text>
                  <Text marginBottom={sizes.sm}>
                    If you have any questions or comments about these terms and
                    conditions, please contact us at support@mapin.com.
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

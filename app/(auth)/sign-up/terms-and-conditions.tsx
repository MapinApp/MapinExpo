import React from "react";
import { useRouter } from "expo-router";
// Custom
import { Block, Button, Text } from "@/components/ui";
import { useTheme } from "@/context/theme";

export default function TC() {
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
                  Terms & Conditions
                </Text>
                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm}>
                  <Text p marginBottom={sizes.sm} marginTop={sizes.sm}>
                    Welcome to Mapin! Please read these Terms and Conditions
                    carefully as they govern your use of our app. By using
                    Mapin, you are agreeing to these Terms and Conditions, which
                    constitute a binding agreement between you and Mapin.{" "}
                  </Text>
                  <Text underline semibold p marginBottom={sizes.sm}>
                    1. Use of Mapin{" "}
                  </Text>

                  <Text p marginBottom={sizes.sm}>
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

                  <Text underline semibold p marginBottom={sizes.sm}>
                    2. Disclaimer of Warranties
                  </Text>
                  <Text p marginBottom={sizes.sm}>
                    Mapin is provided on an "as is" and "as available" basis. We
                    do not make any warranties or representations of any kind,
                    express or implied, including but not limited to warranties
                    of merchantability, fitness for a particular purpose,
                    non-infringement, or compatibility.
                  </Text>
                  <Text underline semibold p marginBottom={sizes.sm}>
                    3. Limitation of Liability
                  </Text>
                  <Text p marginBottom={sizes.sm}>
                    To the extent permitted by law, Mapin shall not be liable
                    for any direct, indirect, incidental, special, or
                    consequential damages arising out of or in any way connected
                    with the use of Mapin, including but not limited to damages
                    for loss of profits, use, data, or other intangible losses.
                  </Text>
                  <Text underline semibold p marginBottom={sizes.sm}>
                    4. Indemnification
                  </Text>
                  <Text p marginBottom={sizes.sm}>
                    You agree to indemnify and hold harmless Mapin, its
                    officers, directors, employees, and agents, from any claims,
                    actions, suits, or proceedings, arising out of or in any way
                    connected with your use of Mapin.
                  </Text>
                  <Text underline semibold p marginBottom={sizes.sm}>
                    5. Governing Law
                  </Text>
                  <Text p marginBottom={sizes.sm}>
                    These terms and conditions shall be governed by and
                    construed in accordance with the laws of the United Kingdom.
                  </Text>
                  <Text underline semibold p marginBottom={sizes.sm}>
                    6. Modification of Terms and Conditions
                  </Text>
                  <Text p marginBottom={sizes.sm}>
                    Mapin reserves the right to modify these terms and
                    conditions at any time. Your continued use of Mapin after
                    any modification constitutes your acceptance of the modified
                    terms and conditions.
                  </Text>
                  <Text underline semibold p marginBottom={sizes.sm}>
                    7. Termination
                  </Text>
                  <Text p marginBottom={sizes.sm}>
                    Mapin may terminate your access to the app at any time,
                    without notice and for any reason, including but not limited
                    to your violation of these terms and conditions.
                  </Text>
                  <Text underline semibold p marginBottom={sizes.sm}>
                    8. Contact Us
                  </Text>
                  <Text p marginBottom={sizes.sm}>
                    If you have any questions or comments about these terms and
                    conditions, please contact us at support@mapin.com.
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

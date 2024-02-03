import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
// Custom
import { Block, Button, Input, Image, Text } from "@/components/ui";
import { useAuth } from "@/context/auth";
import { useTheme } from "@/context/theme";
import * as regex from "@/lib/regex";

const isAndroid = Platform.OS === "android";

export default function LogIn() {
  const router = useRouter();
  const { registerData, setRegisterData, isLoading, isEmailUnique } = useAuth();
  const { theme } = useTheme();
  const { colors, sizes, assets, gradients } = theme;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
    password: false,
    passwordConfirm: false,
  });

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(email),
      password: regex.password.test(password),
      passwordConfirm:
        password === passwordConfirm && regex.password.test(passwordConfirm),
    }));
  }, [email, password, passwordConfirm, setIsValid]);

  const handleRegister = async () => {
    if (
      isValid.email &&
      isValid.password &&
      isValid.passwordConfirm &&
      !isLoading &&
      !loading
    ) {
      setLoading(true);
      const emailUnique = await isEmailUnique(email.toLocaleLowerCase());
      if (!emailUnique) {
        alert("Email already exists...");
        setLoading(false);
        return;
      }
      setRegisterData({ ...registerData, email, password });
      // console.log(registerData);
      setLoading(false);
      router.push("/sign-up/2-user");
    } else {
      if (!isValid.email && isValid.password && isValid.passwordConfirm) {
        alert("Seems your Email isn't valid...");
      } else if (
        !isValid.password &&
        isValid.email &&
        isValid.passwordConfirm
      ) {
        alert("Seems your Password isn't valid...");
      } else if (
        !isValid.passwordConfirm &&
        isValid.email &&
        isValid.password
      ) {
        alert("Seems your Passwords don't match...");
      } else {
        alert("Please check you details...");
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
                <Text medium p center>
                  Register with
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
                    marginBottom={sizes.sm}
                    success={Boolean(password && isValid.password)}
                    danger={Boolean(password && !isValid.password)}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    autoCapitalize={"none"}
                    placeholder="Enter password"
                    autoCorrect={false}
                  />
                  <Input
                    secureTextEntry
                    label="Confirm Password"
                    value={passwordConfirm}
                    marginBottom={sizes.xs}
                    autoCorrect={false}
                    success={Boolean(
                      passwordConfirm && isValid.passwordConfirm
                    )}
                    danger={Boolean(
                      passwordConfirm && !isValid.passwordConfirm
                    )}
                    onChangeText={(text) => setPasswordConfirm(text)}
                    autoCapitalize={"none"}
                    placeholder="Confirm password"
                  />
                </Block>

                <Button
                  onPress={() => handleRegister()}
                  disabled={
                    !Object.values(isValid).every((item) => item === true) ||
                    loading ||
                    isLoading
                  }
                  marginBottom={sizes.s}
                  marginTop={sizes.sm}
                  marginHorizontal={sizes.sm}
                  gradient={gradients.primary}
                >
                  <Text medium size={sizes.p} white uppercase>
                    {loading || isLoading ? "Loading ..." : "Continue"}
                  </Text>
                </Button>
                <Text center p>
                  Already have an account?
                </Text>
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
  password: boolean;
  passwordConfirm: boolean;
}

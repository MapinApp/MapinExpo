import React, { useEffect, useState } from "react";
import { Platform, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { Block, Button, Input, Image, Text, Modal } from "@/components/ui";
import { useAuth } from "@/context/auth";
import { useTheme } from "@/context/theme";
import * as regex from "@/lib/regex";

const isAndroid = Platform.OS === "android";

export default function LogIn() {
  const router = useRouter();
  const { registerData, setRegisterData, isLoading, isUsernameUnique } =
    useAuth();
  const { theme } = useTheme();

  const { colors, sizes, assets, gradients } = theme;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setModal] = useState(false);
  const [gender, setGender] = useState("");

  const [isValid, setIsValid] = useState<ILoginValidation>({
    firstName: false,
    lastName: false,
    username: false,
    gender: false,
  });

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      firstName: regex.name.test(firstName),
      lastName: regex.name.test(lastName),
      username: regex.username.test(username),
      gender: gender !== "",
    }));
  }, [firstName, lastName, username, gender, setIsValid]);

  const handleRegister = async () => {
    if (
      Object.values(isValid).every((item) => item === true) &&
      !loading &&
      !isLoading
    ) {
      setLoading(true);
      const isUnique = await isUsernameUnique(username.toLocaleLowerCase());
      if (!isUnique) {
        alert("Username already exists...");
        setLoading(false);
        return;
      }
      setRegisterData({
        ...registerData,
        username,
        firstName,
        lastName,
        gender,
      });
      // console.log(registerData);
      setLoading(false);
      router.push("/sign-up/3-dob");
    } else {
      if (
        !isValid.firstName &&
        isValid.lastName &&
        isValid.username &&
        isValid.gender
      ) {
        alert("Seems your First Name isn't valid...");
      } else if (
        !isValid.lastName &&
        isValid.firstName &&
        isValid.username &&
        isValid.gender
      ) {
        alert("Seems your Last Name isn't valid...");
      } else if (
        !isValid.username &&
        isValid.firstName &&
        isValid.lastName &&
        isValid.gender
      ) {
        alert("Seems your Username isn't valid...");
      } else if (
        isValid.username &&
        isValid.firstName &&
        isValid.lastName &&
        !isValid.gender
      ) {
        alert("Please pick a gender...");
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
                  Your Details
                </Text>

                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm}>
                  <Input
                    label="First Name(s)"
                    marginBottom={sizes.sm}
                    marginTop={sizes.sm}
                    success={Boolean(firstName && isValid.firstName)}
                    danger={Boolean(firstName && !isValid.firstName)}
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    autoComplete="name"
                    keyboardType="default"
                    placeholder="Enter first name"
                  />
                  <Input
                    label="Last Name"
                    marginBottom={sizes.sm}
                    success={Boolean(lastName && isValid.lastName)}
                    danger={Boolean(lastName && !isValid.lastName)}
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    autoComplete="name"
                    keyboardType="default"
                    placeholder="Enter last name"
                  />
                  <Input
                    marginBottom={sizes.sm}
                    label="Username"
                    success={Boolean(username && isValid.username)}
                    danger={Boolean(username && !isValid.username)}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    autoComplete="username"
                    keyboardType="default"
                    placeholder="Enter username"
                  />
                  <Pressable onPressIn={() => setModal(true)}>
                    <Input
                      marginBottom={sizes.xs}
                      label="Gender"
                      onFocus={() => setModal(true)}
                      success={Boolean(gender && isValid.gender)}
                      disabled
                      value={gender}
                      autoCapitalize={"none"}
                      autoCorrect={false}
                      inputMode="none"
                      placeholder="Choose gender"
                    />
                  </Pressable>
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

                <Button onPress={() => router.back()}>
                  <Text p>Go Back</Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
      {/* Gender Modal */}
      <Modal visible={showModal} onRequestClose={() => setModal(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={["Male", "Female", "Other", "Prefer not to say"]}
          renderItem={({ item }) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                setGender(item);
                setModal(false);
              }}
            >
              <Text h5 transform="uppercase">
                {item}
              </Text>
            </Button>
          )}
        />
      </Modal>
    </>
  );
}

interface ILoginValidation {
  firstName: boolean;
  lastName: boolean;
  username: boolean;
  gender: boolean;
}

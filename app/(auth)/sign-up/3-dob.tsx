import React, { useEffect, useState } from "react";
import { Platform, Pressable } from "react-native";
import { useRouter, Link } from "expo-router";
import { Text as RNText } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

import { Block, Button, Input, Image, Text, Checkbox } from "@/components/ui";
import { useAuth } from "@/context/auth";
import { useTheme } from "@/context/theme";

const isAndroid = Platform.OS === "android";

export default function LogIn() {
  const router = useRouter();
  const { registerData, setRegisterData, isLoading, signUp } = useAuth();
  const { theme } = useTheme();

  const { colors, sizes, assets, gradients } = theme;

  // Date Picker
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [isValid, setIsValid] = useState<ILoginValidation>({
    date: false,
  });
  // ==================
  // Date Picker
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setRegisterData({ ...registerData, dob: currentDate });
  };

  const showDatepicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date ? date : new Date(2000, 0, 1),
        onChange,
        mode: "date",
        is24Hour: true,
      });
    } else {
      setShow(true);
    }
  };
  // ==================
  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      // Make sure date is not undefined, and is more than 13 years ago
      date:
        date !== null &&
        (date as Date) < new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000),
    }));
  }, [date, setIsValid]);

  const handleRegister = () => {
    if (isValid.date && !isLoading) {
      setRegisterData({
        ...registerData,
        dob: date,
      });
      console.log(registerData);
      signUp();
      router.replace("/(auth)/");
    } else {
      if (!isValid.date) {
        alert("Choose a valid date...");
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
              <Block scroll flex={0} marginBottom={"45%"}>
                <Text medium p center>
                  Your Birthday
                </Text>
                <RNText
                  style={{
                    fontSize: 60, // Sets a large text size
                    lineHeight: 70, // Sets the height of each line of text
                    textAlign: "center", // Centers the text horizontally
                  }}
                >
                  🎂
                </RNText>

                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm} paddingTop={sizes.sm}>
                  <Text p marginBottom={sizes.sm}>
                    This won't be part of your public profile.{" "}
                    <Link href="/sign-up/dob-why">
                      <Text p underline primary>
                        Why do I need to provide my date of birth?
                      </Text>
                    </Link>
                  </Text>

                  <Pressable onPress={() => showDatepicker()}>
                    <Input
                      disabled
                      label="Date of Birth"
                      marginBottom={sizes.m}
                      success={Boolean(date && isValid.date)}
                      danger={Boolean(date && !isValid.date)}
                      value={date ? date.toLocaleDateString("en-GB") : ""}
                      autoCapitalize={"none"}
                      placeholder="Enter Birthday"
                      autoCorrect={false}
                      autoComplete="email"
                    />
                  </Pressable>
                </Block>
                <Block
                  row
                  marginTop={sizes.m * 1.1}
                  flex={0}
                  align="center"
                  justify="space-around"
                  paddingHorizontal={sizes.sm}
                >
                  <Checkbox
                    checked={agreed}
                    onPress={() => setAgreed(!agreed)}
                  />
                  <Text marginRight={sizes.s} marginTop={-2}>
                    I agree with the{" "}
                    <Link href="/sign-up/terms-and-conditions">
                      <Text semibold>Terms and Conditions</Text>
                    </Link>
                  </Text>
                </Block>
                <Button
                  onPress={() => handleRegister()}
                  disabled={!isValid.date || !agreed || isLoading}
                  marginBottom={sizes.s}
                  marginTop={sizes.s * 1.4}
                  marginHorizontal={sizes.sm}
                  gradient={gradients.primary}
                >
                  <Text medium size={sizes.p} white uppercase>
                    {isLoading ? "Loading ..." : "Sign Up"}
                  </Text>
                </Button>
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
      {/* The DatePicker */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          onChange={onChange}
        />
      )}
    </>
  );
}

interface ILoginValidation {
  date: boolean;
}

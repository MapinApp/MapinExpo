import React, { useEffect, useState } from "react";
import { Platform, Pressable } from "react-native";
import { useRouter, Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
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
                <Text medium p center>
                  Your Birthday
                </Text>
                <Block
                  flex={0}
                  align="center"
                  marginTop={sizes.s}
                  marginBottom={sizes.sm}
                >
                  <Ionicons name="calendar" size={70} color={colors.text} />
                </Block>
                {/* form inputs */}
                <Block paddingHorizontal={sizes.sm}>
                  <Text marginBottom={sizes.sm}>
                    This won't be part of your public profile.{" "}
                    <Link href="/sign-up/dob-why">
                      <Text underline>
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
                  justify="center"
                  paddingHorizontal={sizes.sm}
                >
                  <Checkbox
                    marginRight={sizes.xs}
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
                  <Text p>Go back</Text>
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

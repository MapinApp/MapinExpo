import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  Platform,
  ViewStyle,
  StyleSheet,
  ColorValue,
} from "react-native";
import * as Haptics from "expo-haptics";

import { ISpacing } from "@/types/theme";
import { useTheme } from "@/context/theme";

const Switch = ({
  id = "Switch",
  checked = false,
  thumbColor = "white",
  activeFillColor,
  inactiveFillColor,
  duration = 250,
  thumbStyle,
  switchStyle,
  style,
  onPress,
  haptic = true,
  ...props
}: ISwitchProps) => {
  const [isChecked, setChecked] = useState(checked);
  const { theme } = useTheme();
  const { colors, sizes } = theme;
  const activeColor = activeFillColor || colors.switchOn;
  const inactiveColor = inactiveFillColor || colors.switchOff;

  const animation = useRef(new Animated.Value(isChecked ? 28 : 2)).current;

  const handleToggle = useCallback(() => {
    setChecked(!isChecked);
    onPress?.(!isChecked);

    /* haptic feedback onPress */
    if (haptic) {
      Haptics.selectionAsync();
    }
  }, [isChecked, haptic, setChecked, onPress]);

  useEffect(() => {
    Animated.timing(animation, {
      duration,
      useNativeDriver: false,
      toValue: isChecked ? 28 : 2,
    }).start();
  }, [isChecked, animation, duration]);

  /* update local state for isChecked when checked prop is updated */
  useEffect(() => {
    if (isChecked !== checked) {
      setChecked(checked);
    }
  }, [isChecked, checked]);

  const bgColor = animation.interpolate({
    inputRange: [2, 28],
    outputRange: [String(inactiveColor), String(activeColor)],
  });

  const switchStyles = StyleSheet.flatten([
    {
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: bgColor,
      height: sizes.switchHeight,
    },
    switchStyle,
  ]) as ViewStyle;

  const thumbStyles = StyleSheet.flatten([
    thumbStyle,
    {
      width: sizes.switchThumb,
      height: sizes.switchThumb,
      backgroundColor: thumbColor,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: sizes.shadowOffsetWidth,
        height: sizes.shadowOffsetHeight,
      },
      shadowOpacity: sizes.shadowOpacity,
      shadowRadius: sizes.shadowRadius,
      elevation: sizes.elevation,
      borderRadius: sizes.switchThumb / 2,
      transform: [{ translateX: animation }],
    },
  ]) as ViewStyle;

  const containerStyles = StyleSheet.flatten([
    style,
    {
      overflow: "hidden",
      width: sizes.switchWidth,
      height: sizes.switchHeight,
      borderRadius: sizes.switchHeight,
    },
  ]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const switchID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <Pressable
      {...switchID}
      hitSlop={sizes.s}
      onPress={handleToggle}
      style={containerStyles}
      {...props}
    >
      <Animated.View style={switchStyles}>
        <Animated.View style={thumbStyles} />
      </Animated.View>
    </Pressable>
  );
};

export default React.memo(Switch);

interface ISwitchProps extends ISpacing {
  /**
   * id for testID & accesibilityLabel
   */
  id?: string;
  /**
   * Switch checked value
   */
  checked?: boolean;
  /**
   * Renders the Switch component with custom style, overwrite existing/predefined styles
   * @see https://reactnative.dev/docs/view#style
   */
  style?: ViewStyle;
  /**
   * Renders the thumb color value
   */
  thumbColor?: ColorValue;
  /**
   * Renders the switch active thumb backgroundColor value
   */
  activeFillColor?: ColorValue;
  /**
   * Renders the switch inactive thumb backgroundColor value
   */
  inactiveFillColor?: ColorValue;
  /**
   * Renders the thumb style
   * @see https://reactnative.dev/docs/view#style
   */
  thumbStyle?: ViewStyle;
  /**
   * Renders the switch container style
   * @see https://reactnative.dev/docs/view#style
   */
  switchStyle?: ViewStyle;
  /**
   * Switch onPress callback passing the checked value as params
   */
  onPress?: (checked: boolean) => void;
  /**
   * Provides haptic feedback when toggling the switch
   * @see https://docs.expo.io/versions/latest/sdk/haptics/
   */
  haptic?: boolean;
  /**
   * Duration in ms for thumb animated position
   */
  duration?: Animated.TimingAnimationConfig["duration"];
}

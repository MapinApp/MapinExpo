import React, { useCallback, useState } from "react";
import {
  Image,
  TextInput,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Platform,
  ColorValue,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ISpacing } from "@/types/theme";
import { useTheme } from "@/context/theme";
import Text from "./Text";
import Block from "./Block";

const Input = ({
  id = "Input",
  style,
  color,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  danger,
  warning,
  success,
  info,
  search,
  disabled,
  label,
  icon,
  marginBottom,
  marginTop,
  marginHorizontal,
  marginVertical,
  marginRight,
  marginLeft,
  onFocus,
  onBlur,
  ...props
}: IInputProps) => {
  const { theme } = useTheme();
  const { icons, colors, sizes, fonts } = theme;
  const [isFocused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (event: any, focus: boolean) => {
      setFocused(focus);
      focus && onFocus?.(event);
      !focus && onBlur?.(event);
    },
    [setFocused, onFocus, onBlur]
  );

  const colorIndex = primary
    ? "primary"
    : secondary
    ? "secondary"
    : tertiary
    ? "tertiary"
    : black
    ? "black"
    : white
    ? "white"
    : gray
    ? "gray"
    : danger
    ? "danger"
    : warning
    ? "warning"
    : success
    ? "success"
    : info
    ? "info"
    : null;
  const inputColor = color
    ? color
    : colorIndex
    ? colors?.[colorIndex]
    : colors.gray;

  const inputBoxStyles = StyleSheet.flatten([
    style,
    {
      minHeight: sizes.inputHeight,
      ...(marginBottom && { marginBottom: marginBottom }),
      ...(marginTop && { marginTop: marginTop }),
      ...(marginHorizontal && { marginHorizontal: marginHorizontal }),
      ...(marginVertical && { marginVertical: marginVertical }),
      ...(marginRight && { marginRight: marginRight }),
      ...(marginLeft && { marginLeft: marginLeft }),
    },
  ]) as ViewStyle;

  const inputContainerStyles = StyleSheet.flatten([
    {
      minHeight: sizes.inputHeight,
      borderRadius: sizes.inputRadius,
      borderWidth: sizes.inputBorder,
      borderColor: isFocused ? colors.focus : inputColor,
    },
  ]) as ViewStyle;

  const inputStyles = StyleSheet.flatten([
    {
      flex: 1,
      zIndex: 2,
      height: "100%",
      fontSize: sizes.p,
      color: colors.input,
      paddingHorizontal: sizes.inputPadding,
      fontFamily: fonts.p,
    },
  ]) as TextStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const inputID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <Block flex={0} style={inputBoxStyles}>
      {label && (
        <Text p medium marginBottom={sizes.s}>
          {label}
        </Text>
      )}
      <Block row align="center" justify="flex-end" style={inputContainerStyles}>
        {search && (
          <Ionicons
            name="search"
            size={22}
            color={colors.icon}
            style={{ marginLeft: sizes.inputPadding }}
          />
        )}
        {icon && (
          <Ionicons
            name={icon}
            size={22}
            color={colors.icon}
            style={{ marginLeft: sizes.inputPadding }}
          />
        )}
        <TextInput
          {...inputID}
          {...props}
          style={inputStyles}
          editable={!disabled}
          placeholderTextColor={inputColor}
          onFocus={(event) => handleFocus(event, true)}
          onBlur={(event) => handleFocus(event, false)}
        />
        {danger && icons.warning && (
          <Image
            source={icons.warning}
            style={{
              marginRight: sizes.s * 1.5,
              tintColor: colors.danger,
            }}
          />
        )}
        {success && icons.check && (
          <Image
            source={icons.check}
            style={{
              width: 12,
              height: 9,
              marginRight: sizes.s * 1.5,
              tintColor: colors.success,
            }}
          />
        )}
      </Block>
    </Block>
  );
};

export default React.memo(Input);

interface IInputProps extends TextInputProps, ISpacing {
  /**
   * id for testID & accesibilityLabel
   */
  id?: string;
  /**
   * Renders a custom borderColor & placeholderTextColor
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  color?: ColorValue;
  /**
   * Renders a borderColor & placeholderTextColor directly from the colors.primary value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  primary?: boolean;
  /**
   * Renders a borderColor & placeholderTextColor directly from the colors.secondary value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  secondary?: boolean;
  /**
   * Renders a borderColor & placeholderTextColor directly from the colors.tertiary value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  tertiary?: boolean;
  /**
   * Renders a borderColor & placeholderTextColor directly from the colors.black value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  black?: boolean;
  /**
   * Renders a borderColor & placeholderTextColor directly from the colors.white value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  white?: boolean;
  /**
   * Renders a borderColor & placeholderTextColor directly from the colors.gray value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  gray?: boolean;
  /**
   * Renders a borderColor & placeholderTextColor directly from the colors.danger value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  danger?: boolean;
  /**
   * Renders a right side danger icon for invalid input value
   * Renders a borderColor & placeholderTextColor directly from the colors.warning value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  warning?: boolean;
  /**
   * Renders a borderColor & placeholderTextColor directly from the colors.success value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  success?: boolean;
  /**
   * Renders a right side success icon for valid input value
   * Renders a borderColor & placeholderTextColor directly from the colors.info value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  info?: boolean;
  /**
   * Renders a right side search icon
   */
  search?: boolean;
  /**
   * Renders a disabled / non-editable TextInput
   * @see https://reactnative.dev/docs/textinput#editable
   */
  disabled?: boolean;
  /**
   * Renders the label top text
   */
  label?: string;
  /**
   * Renders a left side icon image from the Theme assets
   */
  icon?: keyof typeof Ionicons.glyphMap;
  /**
   * Renders the TextInput content
   */
  children?: React.ReactNode;
  /**
   * Renders the TextInput/Input component with custom style, overwrite existing/predefined styles
   * @see https://reactnative.dev/docs/textinput#style
   */
  style?: TextStyle;
}

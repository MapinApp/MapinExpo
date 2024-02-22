import React from "react";
import {
  StyleSheet,
  Modal as RNModal,
  ViewStyle,
  Platform,
  ModalProps,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "@/context/theme";

import Block from "./Block";
import Button from "./Button";
import Image from "./Image";

const Modal = ({
  id = "Modal",
  children,
  style,
  onRequestClose,
  ...props
}: IModalProps) => {
  const { theme } = useTheme();
  const { icons, colors, sizes } = theme;
  const modalStyles = StyleSheet.flatten([style, {}]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const modalID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <RNModal
      {...modalID}
      {...props}
      transparent
      style={modalStyles}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <Block justify="flex-end">
        <Block safe modal flex={0}>
          <Button
            top={0}
            right={0}
            position="absolute"
            onPress={(e) => onRequestClose?.(e)}
          >
            <Ionicons name="close" size={16} color={colors.text} />
          </Button>
          <Block
            flex={0}
            marginTop={sizes.md}
            paddingHorizontal={sizes.padding}
          >
            {children}
          </Block>
        </Block>
      </Block>
    </RNModal>
  );
};

export default React.memo(Modal);

interface IModalProps extends ModalProps {
  /**
   * id for testID & accesibilityLabel
   */
  id?: string;
  /**
   * Renders the Modal content
   */
  children?: React.ReactNode;
  /**
   * Renders the Text Modal with custom style, overwrite existing/predefined styles
   * @see https://reactnative.dev/docs/view#style
   */
  style?: ViewStyle;
}

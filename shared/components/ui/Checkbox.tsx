import React, { useCallback, useState } from "react";
import { Platform, Pressable, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";

import { useTheme } from "@/context/theme";
import { ISpacing } from "@/types/theme";
import Block from "./Block";
import Image from "./Image";

const Checkbox = ({
  onPress,
  haptic = true,
  id = "Checkbox",
  ...props
}: ICheckboxProps) => {
  const { theme } = useTheme();
  const { colors, icons, sizes } = theme;
  const [checked, setChecked] = useState(false);

  const handlePress = useCallback(() => {
    onPress?.(!checked);
    setChecked(!checked);
    /* haptic feedback onPress */
    if (haptic) {
      Haptics.selectionAsync();
    }
  }, [checked, haptic, setChecked, onPress]);

  // generate component testID or accessibilityLabel based on Platform.OS
  const checkboxID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <Pressable {...checkboxID} hitSlop={sizes.s} onPress={handlePress}>
      <Block
        flex={0}
        align="center"
        justify="center"
        gray={!checked}
        outlined={!checked}
        width={sizes.checkboxWidth}
        height={sizes.checkboxHeight}
        radius={sizes.checkboxRadius}
        gradient={checked ? colors.checkbox : undefined}
        {...props}
      >
        {checked && (
          <Image
            source={icons.check}
            color={colors.checkboxIcon}
            width={sizes.checkboxIconWidth}
            height={sizes.checkboxIconHeight}
            disableTransition={true}
          />
        )}
      </Block>
    </Pressable>
  );
};

export default React.memo(Checkbox);

interface ICheckboxProps extends ISpacing {
  /**
   * id for testID & accesibilityLabel
   */
  id?: string;
  /**
   * Checkbox checked value
   */
  checked?: boolean;
  /**
   * Provides haptic feedback when toggling the checkbox
   * @see https://docs.expo.io/versions/latest/sdk/haptics/
   */
  haptic?: boolean;
  /**
   * Renders the Pressable container style
   * @see https://reactnative.dev/docs/view#style
   */
  style?: ViewStyle;
  /**
   * Checkbox onPress callback passing the checked value as params
   */
  onPress?: (checked: boolean) => void;
}

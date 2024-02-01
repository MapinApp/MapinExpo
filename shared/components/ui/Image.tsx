import React from "react";
import {
  StyleSheet,
  ImageStyle,
  ImageBackground,
  Platform,
  StyleProp,
} from "react-native";
import { ISpacing } from "@/types/theme";
import { Image as ExpoImage, ImageProps } from "expo-image";
import { useTheme } from "@/context/theme";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Image = ({
  id = "Image",
  style,
  children,
  avatar,
  shadow,
  rounded,
  background,
  radius,
  color,
  height,
  width,
  transform,
  padding,
  paddingVertical,
  paddingHorizontal,
  paddingRight,
  paddingLeft,
  paddingTop,
  paddingBottom,
  margin,
  marginVertical,
  marginHorizontal,
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
  ...props
}: IImageProps) => {
  const { theme } = useTheme();
  const { colors, sizes } = theme;

  const imageStyles = StyleSheet.flatten([
    style,
    {
      borderRadius: sizes.imageRadius,
      ...(height && { height }),
      ...(width && { width }),
      ...(margin && { margin }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(padding && { padding }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(rounded && { borderRadius: sizes.radius, overflow: "hidden" }),
      ...(radius !== undefined && { borderRadius: radius, overflow: "hidden" }),
      ...(color && { tintColor: color }),
      ...(transform && { transform }),
      ...(shadow && {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
      }),
      ...(avatar && {
        height: sizes.avatarSize,
        width: sizes.avatarSize,
        borderRadius: sizes.avatarRadius,
        overflow: "hidden",
      }),
    },
  ]) as ImageStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const imageID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  return (
    <ExpoImage
      style={imageStyles}
      {...props}
      {...imageID}
      placeholder={blurhash}
      transition={1000}
    />
  );
};

export default Image;

interface IImageProps extends ImageProps, ISpacing {
  /**
   * id for testID & accesibilityLabel
   */
  id?: string;
  /**
   * Avatar sizing: borderRadius from Math.min(height, weight)
   * sets the width & height to Math.min(height, weight)
   */
  height?: any;
  /**
   * Height of the image component.
   * @see https://reactnative.dev/docs/image#height
   */
  width?: any;
  /**
   * @see https://reactnative.dev/docs/image#width
   */
  avatar?: boolean;
  /**
   * Generates a shadow style
   * @see https://reactnative.dev/docs/shadow-props
   */
  shadow?: boolean;
  /**
   * Renders an ImageBackground component
   * @see https://reactnative.dev/docs/imagebackground
   */
  background?: boolean;
  /**
   * Renders a predefined theme sizes.borderRadius & overflow: 'hidden'
   * @see https://reactnative.dev/docs/image-style-props#borderradius
   */
  rounded?: boolean;
  /**
   * Renders a custom borderRadius value
   * @see https://reactnative.dev/docs/image-style-props#borderradius
   */
  radius?: ImageStyle["borderRadius"];
  /**
   * Changes the color of all the non-transparent pixels to the tintColor.
   * @see https://reactnative.dev/docs/image-style-props#tintcolor
   */
  color?: ImageStyle["tintColor"];
  /**
   * Modify the appearance and position of your components using 2D or 3D transformations
   * @see https://reactnative.dev/docs/transforms#transform
   */
  transform?: ImageStyle["transform"];
  /**
   * Renders the Image component with custom style, overwrite existing/predefined styles
   * @see https://reactnative.dev/docs/image#style
   */
  style?: StyleProp<ImageStyle>;
  /** Renders the ImageBackground content */
  children?: React.ReactNode;
}

import { memo } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TextProps,
  FlexStyle,
} from "react-native";
import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { ITheme } from "@/types/theme";
import { useTheme } from "@/context/theme";

const Typography = (props: ITextProps) => {
  const {
    id = "Text",
    children,
    style,
    center,
    gradient,
    color,
    opacity,
    italic,
    // predefined colors
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
    size,
    medium,
    bold,
    semibold,
    weight,
    h1,
    h2,
    h3,
    h4,
    h5,
    p,
    font,
    align,
    transform,
    lineHeight,
    position,
    right,
    left,
    top,
    bottom,
    start,
    end,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    marginRight,
    marginLeft,
    paddingBottom,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    paddingRight,
    paddingLeft,
    uppercase,
    underline,
    ...rest
  } = props;
  // use theme context
  const { theme } = useTheme();
  const { colors, sizes, lines, weights, fonts, letterSpacing } = theme;

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
  // color
  const textColor = color
    ? color
    : colorIndex
    ? colors?.[colorIndex]
    : undefined;

  const textStyles = StyleSheet.flatten([
    style,
    {
      color: colors.text,
      fontSize: sizes.text,
      lineHeight: lines.text,
      fontWeight: weights.text,
      fontFamily: fonts.text,
      ...(uppercase && { textTransform: "uppercase" }),
      ...(textColor && { color: textColor }),
      ...(h1 && {
        fontSize: sizes.h1,
        lineHeight: lines.h1,
        fontWeight: weights.h1,
        fontFamily: fonts.h1,
        letterSpacing: letterSpacing.h1,
      }),
      ...(h2 && {
        fontSize: sizes.h2,
        lineHeight: lines.h2,
        fontWeight: weights.h2,
        fontFamily: italic ? fonts.h2 + "Italic" : fonts.h2,
        letterSpacing: letterSpacing.h2,
      }),
      ...(h3 && {
        fontSize: sizes.h3,
        lineHeight: lines.h3,
        fontWeight: weights.h3,
        fontFamily: italic ? fonts.h3 + "Italic" : fonts.h3,
        letterSpacing: letterSpacing.h3,
      }),
      ...(h4 && {
        fontSize: sizes.h4,
        lineHeight: lines.h4,
        fontWeight: weights.h4,
        fontFamily: italic ? fonts.h4 + "Italic" : fonts.h4,
        letterSpacing: letterSpacing.h4,
      }),
      ...(h5 && {
        fontSize: sizes.h5,
        lineHeight: lines.h5,
        fontWeight: weights.h5,
        fontFamily: italic ? fonts.h5 + "Italic" : fonts.h5,
        letterSpacing: letterSpacing.h5,
      }),
      ...(p && {
        fontSize: sizes.p,
        lineHeight: lines.p,
        fontWeight: weights.p,
        fontFamily: italic ? fonts.p + "Italic" : fonts.p,
        letterSpacing: letterSpacing.p,
      }),
      ...(underline && { textDecorationLine: "underline" }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(center && { textAlign: "center" }),
      ...(align && { textAlign: align }),
      ...(medium && {
        fontFamily: italic ? fonts.medium + "Italic" : fonts.medium,
      }),
      ...(bold && { fontFamily: italic ? fonts.bold + "Italic" : fonts.bold }),
      ...(semibold && {
        fontFamily: italic ? fonts.semibold + "Italic" : fonts.bold,
      }),

      ...(weight && { fontWeight: weight }),
      ...(transform && { textTransform: transform }),
      ...(font && { fontFamily: font }),
      ...(size && { fontSize: size }),
      ...(color && { color }),
      ...(opacity && { opacity }),
      ...(lineHeight && { lineHeight }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
  ]) as TextStyle;

  /*
   * Calculate gradient height container based on text lineHeight or fontSize
   * add an extra value from marginVertical or marginTop or marginBottom
   */
  const gradientHeight =
    Number(textStyles?.lineHeight || textStyles?.fontSize || 0) +
    Number(
      textStyles?.marginVertical ||
        textStyles?.marginTop ||
        textStyles?.marginBottom ||
        0
    );

  // generate component testID or accessibilityLabel based on Platform.OS
  const textID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  if (gradient) {
    return (
      <MaskedView
        maskElement={
          <Text {...textID} {...rest} style={textStyles} {...props} />
        }
      >
        <LinearGradient
          colors={gradient}
          end={end || [1, 0]}
          start={start || [0, 0]}
        >
          <Text
            {...textID}
            {...rest}
            style={[textStyles, { opacity: 0 }]}
            {...props}
          />
        </LinearGradient>
      </MaskedView>
    );
  }

  return (
    <Text {...textID} {...rest} style={textStyles}>
      {children}
    </Text>
  );
};

export default memo(Typography);

// ==============================
// Interfaces
// ==============================

interface ISpacing
  extends Pick<
    FlexStyle,
    | "margin"
    | "marginVertical"
    | "marginHorizontal"
    | "marginLeft"
    | "marginRight"
    | "marginTop"
    | "marginBottom"
    | "padding"
    | "paddingVertical"
    | "paddingHorizontal"
    | "paddingLeft"
    | "paddingRight"
    | "paddingTop"
    | "paddingBottom"
  > {}

interface ITextProps extends TextProps, ISpacing {
  /**
   * id for testID & accesibilityLabel
   */
  id?: string;
  /**
   * Renders a Text with predefined textAlign: center
   * @see https://reactnative.dev/docs/text-style-props#textalign
   */
  center?: boolean;
  /**
   * Renders LinearGradient component, colors
   * @see https://docs.expo.io/versions/latest/sdk/linear-gradient/#props
   */
  italic?: boolean;
  gradient?: string[];
  /**
   * Renders a Text color directly from the colors.primary value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  primary?: boolean;
  /**
   * Renders a Text color directly from the colors.secondary value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  secondary?: boolean;
  /**
   * Renders a Text color directly from the colors.tertiary value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  tertiary?: boolean;
  /**
   * Renders a Text color directly from the colors.black value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  black?: boolean;
  /**
   * Renders a Text color directly from the colors.white value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  white?: boolean;
  /**
   * Renders a Text color directly from the colors.gray value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  gray?: boolean;
  /**
   * Renders a Text color directly from the colors.danger value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  danger?: boolean;
  /**
   * Renders a Text color directly from the colors.warning value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  warning?: boolean;
  /**
   * Renders a Text color directly from the colors.success value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  success?: boolean;
  /**
   * Renders a Text color directly from the colors.info value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  info?: boolean;
  /**
   * Renders a Text custom color value
   * @see https://reactnative.dev/docs/text-style-props#color
   */
  color?: TextStyle["color"];
  /**
   * Renders a Text with custom opacity value
   * @see https://reactnative.dev/docs/view-style-props#opacity
   */
  opacity?: TextStyle["opacity"];
  /**
   * Renders a Text with custom fontSize
   * @see https://reactnative.dev/docs/text-style-props#fontsize
   */
  size?: ITheme["sizes"] | string | number;
  /**
   * Renders a Text with custom fontWeight
   * @see https://reactnative.dev/docs/text-style-props#fontweight
   */
  weight?: TextStyle["fontWeight"];
  /**
   * Renders a Text with custom fontFamily
   * @see https://reactnative.dev/docs/text-style-props#fontfamily
   */
  font?: string;
  /**
   * Renders a Text with predefined fontFamily from theme fonts.bold
   * @see https://reactnative.dev/docs/text-style-props#fontfamily
   */
  medium?: boolean;
  /**
   * Renders a Text with predefined fontFamily from theme fonts.bold
   * @see https://reactnative.dev/docs/text-style-props#fontfamily
   */
  bold?: boolean;
  /**
   * Renders a Text with predefined fontFamily from theme fonts.semibold
   * @see https://reactnative.dev/docs/text-style-props#fontfamily
   */
  semibold?: boolean;
  /**
   * Renders LinearGradient start points
   * @see https://docs.expo.io/versions/latest/sdk/linear-gradient/#props
   */
  start?: LinearGradientPoint;
  /**
   * Renders LinearGradient end points
   * @see https://docs.expo.io/versions/latest/sdk/linear-gradient/#props
   */
  end?: LinearGradientPoint;
  /**
   * Renders a Text with predefined fontSize from theme sizes.h1
   * @see https://reactnative.dev/docs/text-style-props#fontsize
   */
  h1?: boolean;
  /**
   * Renders a Text with predefined fontSize from theme sizes.h2
   * @see https://reactnative.dev/docs/text-style-props#fontsize
   */
  h2?: boolean;
  /**
   * Renders a Text with predefined fontSize from theme sizes.h3
   * @see https://reactnative.dev/docs/text-style-props#fontsize
   */
  h3?: boolean;
  /**
   * Renders a Text with predefined fontSize from theme sizes.h4
   * @see https://reactnative.dev/docs/text-style-props#fontsize
   */
  h4?: boolean;
  /**
   * Renders a Text with predefined fontSize from theme sizes.h5
   * @see https://reactnative.dev/docs/text-style-props#fontsize
   */
  h5?: boolean;
  /**
   * Renders a Text with predefined fontSize from theme sizes.p
   * @see https://reactnative.dev/docs/text-style-props#fontsize
   */
  p?: boolean;
  /**
   * Renders a Text with custom textAlign
   * @see https://reactnative.dev/docs/text-style-props#textalign
   */
  align?: TextStyle["textAlign"];
  /**
   * Renders a Text with custom textTransform: 'none', 'uppercase', 'lowercase', 'capitalize'
   * @see https://reactnative.dev/docs/text-style-props#texttransform
   */
  transform?: TextStyle["textTransform"];
  /**
   * Renders a Text with custom lineHeight
   * @see https://reactnative.dev/docs/text-style-props#lineheight
   */
  lineHeight?: TextStyle["lineHeight"];
  /**
   * Renders text right offset
   * @see https://reactnative.dev/docs/layout-props#right
   */
  right?: TextStyle["right"];
  /**
   * Renders the View left offset
   * @see https://reactnative.dev/docs/layout-props#left
   */
  left?: TextStyle["left"];
  /**
   * Renders the View top offset
   * @see https://reactnative.dev/docs/layout-props#top
   */
  top?: TextStyle["top"];
  /**
   * Renders the View bottom offset
   * @see https://reactnative.dev/docs/layout-props#bottom
   */
  bottom?: TextStyle["bottom"];
  /**
   * Renders text position
   * @see https://reactnative.dev/docs/layout-props#position
   */
  position?: TextStyle["position"];
  /**
   * Renders a Text component to display text
   * Supports nesting, styling, and touch handling.
   * @see https://reactnative.dev/docs/text
   */
  children?: React.ReactNode;
  /**
   * Renders the Text component with custom style, overwrite existing/predefined styles
   * @see https://reactnative.dev/docs/text#style
   */
  style?: TextStyle;
  uppercase?: boolean;
  underline?: boolean;
}

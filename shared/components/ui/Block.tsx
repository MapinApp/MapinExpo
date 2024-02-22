/* Component: Block
Description: A View compnent with some extra features
Returns:
===============================
safe ? SafeAreaView
keyboard ? KeyboardAwareScrollView
scroll ? ScrollView
gradient ? LinearGradient
blur ? BlurView
else View
=================================
*/

import { memo } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  ViewProps,
  ScrollViewProps,
  StyleProp,
  ImageBackground,
} from "react-native";
import { ISpacing } from "@/types/theme";
import { BlurView, BlurViewProps } from "expo-blur";
import { LinearGradient, LinearGradientPoint } from "expo-linear-gradient";
import { useTheme } from "@/context/theme";

const Block = (props: IBlockProps) => {
  const {
    id = "Block",
    children,
    style,
    shadow,
    card,
    modal,
    list,
    center,
    outlined,
    overflow,
    row,
    safe,
    background,
    keyboard,
    scroll,
    color,
    gradient,
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
    radius,
    height,
    width,
    margin,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    marginRight,
    marginLeft,
    padding,
    paddingBottom,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    paddingRight,
    paddingLeft,
    justify,
    align,
    flex = 1,
    wrap,
    blur,
    intensity,
    tint,
    position,
    right,
    left,
    top,
    bottom,
    end,
    start,
    ...rest
  } = props;
  const { theme, isDark } = useTheme();
  const { assets, colors, sizes } = theme;

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

  const blockColor = color
    ? color
    : colorIndex
    ? colors?.[colorIndex]
    : undefined;

  const blockStyles = StyleSheet.flatten([
    style,
    {
      ...(shadow && {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
        elevation: sizes.elevation,
      }),
      ...(card && {
        backgroundColor: colors.card,
        borderRadius: sizes.cardRadius,
        padding: sizes.cardPadding,
        borderWidth: 0.8,
        borderColor: colors.border,
      }),
      ...(modal && {
        backgroundColor: colors.card,
        borderTopRightRadius: sizes.cardRadius,
        borderTopLeftRadius: sizes.cardRadius,
        padding: sizes.cardPadding,
        // Shadow
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
        elevation: sizes.elevation,
      }),
      ...(list && {
        backgroundColor: colors.card,
        padding: sizes.cardPadding,
        paddingBottom: sizes.sm,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: colors.border,
      }),

      ...(margin !== undefined && { margin }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(padding !== undefined && { padding }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(radius && { borderRadius: radius }),
      ...(height && { height }),
      ...(width && { width }),
      ...(overflow && { overflow }),
      ...(flex !== undefined && { flex }),
      ...(row && { flexDirection: "row" }),
      ...(align && { alignItems: align }),
      ...(center && { justifyContent: "center" }),
      ...(justify && { justifyContent: justify }),
      ...(wrap && { flexWrap: wrap }),
      ...(blockColor && { backgroundColor: blockColor }),
      ...(outlined && {
        borderWidth: 0.8,
        borderColor: colors.gray,
        // backgroundColor: "transparent",
      }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
  ]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const blockID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  if (safe) {
    return (
      <SafeAreaView {...blockID} {...rest} style={blockStyles}>
        {children}
      </SafeAreaView>
    );
  }

  if (scroll) {
    return (
      <ScrollView {...blockID} {...rest} style={blockStyles}>
        {children}
      </ScrollView>
    );
  }

  if (gradient) {
    return (
      <LinearGradient
        {...blockID}
        colors={gradient}
        style={blockStyles}
        end={end || [1, 0]}
        start={start || [0, 0]}
        {...rest}
      >
        {children}
      </LinearGradient>
    );
  }

  if (blur) {
    return (
      <BlurView
        {...blockID}
        tint={tint}
        intensity={intensity}
        style={blockStyles}
      >
        {children}
      </BlurView>
    );
  }

  if (background) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <ImageBackground
          source={isDark ? assets.backgroundDark : assets.backgroundLight}
          resizeMode="cover"
          style={blockStyles}
        >
          {children}
        </ImageBackground>
      </View>
    );
  }

  return (
    <View {...blockID} {...rest} style={blockStyles}>
      {children}
    </View>
  );
};

export default memo(Block);

// ==============================
// Interfaces
// ==============================

interface IBlockProps extends ISpacing, ViewProps, ScrollViewProps {
  /**
   * id for testID & accesibilityLabel
   */
  id?: string;
  /**
   * Renders a View flex style
   * @see https://reactnative.dev/docs/flexbox#proptypes
   * @see https://reactnative.dev/docs/layout-props
   */
  flex?: ViewStyle["flex"];
  /**
   * Renders a View flexDirection: row style
   * @see https://reactnative.dev/docs/flexbox#flex-direction
   */
  row?: boolean;
  /**
   * Renders a View flexWrap style
   * @see https://reactnative.dev/docs/flexbox#flex-wrap
   */
  wrap?: ViewStyle["flexWrap"];
  /**
   * Renders a SafeAreaView component
   * @see https://reactnative.dev/docs/safeareaview
   */
  safe?: boolean;
  /**
   * Renders an ImageBackground component
   * @see https://reactnative.dev/docs/imagebackground
   */
  background?: boolean;
  /**
   * Renders a KeyboardAwareScrollView component
   * @see https://github.com/APSL/react-native-keyboard-aware-scroll-view#usage
   */
  keyboard?: boolean;
  /**
   * Renders a ScrollView component
   * @see https://reactnative.dev/docs/scrollview
   */
  scroll?: boolean;
  /**
   * Generates a shadow style
   * @see https://reactnative.dev/docs/shadow-props
   */
  shadow?: boolean;
  /**
   * Renders a View with predefined backgroundColor, borderRadius, padding, shadow / elevation
   * @see https://reactnative.dev/docs/shadow-props
   */
  card?: boolean;
  /**
   * Renders a View with predefined backgroundColor, borderRadius, padding, shadow / elevation
   * @see https://reactnative.dev/docs/shadow-props
   */
  modal?: boolean;
  /**
   * Renders a View with predefined justifyContent: center
   * @see https://reactnative.dev/docs/flexbox#justify-content
   */
  list?: boolean;
  /**
   * Renders a View with predefined justifyContent: center
   * @see https://reactnative.dev/docs/flexbox#justify-content
   */
  center?: boolean;
  /**
   * Renders a View with predefined borderWidth: 1, backgroundColor: 'transparent' & borderColor inherited
   */
  outlined?: boolean;
  /**
   * Renders the View/Block component with custom style, overwrite existing/predefined styles
   * @see https://reactnative.dev/docs/view#style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Renders a View style overflow
   * @see https://reactnative.dev/docs/layout-props#overflow
   */
  overflow?: ViewStyle["overflow"];
  /**
   * Renders a custom backgroundColor
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  color?: ViewStyle["backgroundColor"];
  /**
   * Renders LinearGradient component, colors
   * @see https://docs.expo.io/versions/latest/sdk/linear-gradient/#props
   */
  gradient?: string[];
  /**
   * Renders a backgroundColor directly from the colors.primary value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  primary?: boolean;
  /**
   * Renders a backgroundColor directly from the colors.secondary value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  secondary?: boolean;
  /**
   * Renders a backgroundColor directly from the colors.tertiary value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  tertiary?: boolean;
  /**
   * Renders a backgroundColor directly from the colors.black value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  black?: boolean;
  /**
   * Renders a backgroundColor directly from the colors.white value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  white?: boolean;
  /**
   * Renders a backgroundColor directly from the colors.gray value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  gray?: boolean;
  /**
   * Renders a backgroundColor directly from the colors.danger value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  danger?: boolean;
  /**
   * Renders a backgroundColor directly from the colors.warning value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  warning?: boolean;
  /**
   * Renders a backgroundColor directly from the colors.success value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  success?: boolean;
  /**
   * Renders a backgroundColor directly from the colors.info value
   * @see https://reactnative.dev/docs/view-style-props#backgroundcolor
   */
  info?: boolean;
  /**
   * Renders a custom borderRadius value
   * @see https://reactnative.dev/docs/view-style-props#borderradius
   */
  radius?: ViewStyle["borderRadius"];
  /**
   * Renders a custom height value
   * @see https://reactnative.dev/docs/layout-props#height
   */
  height?: ViewStyle["height"];
  /**
   * Renders a custom width value
   * @see https://reactnative.dev/docs/layout-props#width
   */
  width?: ViewStyle["width"];
  /**
   * Renders a flex justifyContent
   * Available values: 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'
   * @see https://reactnative.dev/docs/layout-props#justifycontent
   */
  justify?: ViewStyle["justifyContent"];
  /**
   * Renders a flex alignItems
   * Available values: 'auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'
   * @see https://reactnative.dev/docs/layout-props#alignitems
   */
  align?: ViewStyle["alignItems"];
  /**
   * Renders the View content
   */
  children?: React.ReactNode;
  /**
   * Renders a BlueView component
   * @see https://docs.expo.io/versions/latest/sdk/blur-view/
   */
  blur?: boolean;
  /**
   * BlueView intensity, default: 50, values accepted: 1 to 100
   * @see https://docs.expo.io/versions/latest/sdk/blur-view/#intensity
   */
  intensity?: BlurViewProps["intensity"];
  /**
   * BlueView tint color, default: 'default', values accepted: 'light', 'dark', 'default'
   * @see https://docs.expo.io/versions/latest/sdk/blur-view/#blurtint
   */
  tint?: BlurViewProps["tint"];
  /**
   * Renders the View position
   * @see https://reactnative.dev/docs/layout-props#position
   */
  position?: ViewStyle["position"];
  /**
   * Renders the View right offset
   * @see https://reactnative.dev/docs/layout-props#right
   */
  right?: ViewStyle["right"];
  /**
   * Renders the View left offset
   * @see https://reactnative.dev/docs/layout-props#left
   */
  left?: ViewStyle["left"];
  /**
   * Renders the View top offset
   * @see https://reactnative.dev/docs/layout-props#top
   */
  top?: ViewStyle["top"];
  /**
   * Renders the View bottom offset
   * @see https://reactnative.dev/docs/layout-props#bottom
   */
  bottom?: ViewStyle["bottom"];
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
}

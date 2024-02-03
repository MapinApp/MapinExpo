import type { ColorValue } from "react-native";
import {
  TextStyle,
  ImageSourcePropType,
  ScaledSize,
  FlexStyle,
} from "react-native";

// Spacing types
export interface ISpacing
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

// Font Weights
// Naming source: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
export interface ThemeWeights {
  text: TextStyle["fontWeight"];
  h1?: TextStyle["fontWeight"];
  h2?: TextStyle["fontWeight"];
  h3?: TextStyle["fontWeight"];
  h4?: TextStyle["fontWeight"];
  h5?: TextStyle["fontWeight"];
  p?: TextStyle["fontWeight"];
  // based on fontWeight
  thin: TextStyle["fontWeight"];
  extralight: TextStyle["fontWeight"];
  light: TextStyle["fontWeight"];
  normal: TextStyle["fontWeight"];
  medium: TextStyle["fontWeight"];
  semibold?: TextStyle["fontWeight"];
  bold?: TextStyle["fontWeight"];
  extrabold?: TextStyle["fontWeight"];
  black?: TextStyle["fontWeight"];
}

export interface ThemeAssets {
  // backgrounds/logo
  og: ImageSourcePropType;
  logo: ImageSourcePropType;
  backgroundLight: ImageSourcePropType;
  backgroundDark: ImageSourcePropType;
}

export interface ThemeFonts {
  text: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  p: string;
  // based on fontWeight
  light: string;
  normal: string;
  medium: string;
  bold: string;
  semibold: string;
  // Italic Montserrat
  italic: string;
}

export interface ThemeLineHeights {
  text: number;
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  p: number;
}

export interface ThemeSizes {
  base: number;
  text: number;
  radius: number;
  padding: number;

  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  p: number;

  buttonBorder: number;
  buttonRadius: number;
  socialSize: number;
  socialRadius: number;
  socialIconSize: number;

  inputHeight: number;
  inputBorder: number;
  inputRadius: number;
  inputPadding: number;

  shadowOffsetWidth: number;
  shadowOffsetHeight: number;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;

  cardRadius: number;
  cardPadding: number;

  imageRadius: number;
  avatarSize: number;
  avatarRadius: number;

  switchWidth: number;
  switchHeight: number;
  switchThumb: number;

  checkboxWidth: number;
  checkboxHeight: number;
  checkboxRadius: number;
  checkboxIconWidth: number;
  checkboxIconHeight: number;

  blockRadius: number;
}

export interface ThemeSpacing {
  xs: number;
  s: number;
  sm: number;
  m: number;
  md: number;
  l: number;
  xl: number;
  xxl: number;
}

export interface ThemeLetterSpacing {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  p: number;
}

export interface ThemeIcons {
  check: ImageSourcePropType;
  warning: ImageSourcePropType;
  close: ImageSourcePropType;
}

export interface ICommonTheme {
  weights: ThemeWeights;
  assets: ThemeAssets;
  fonts: ThemeFonts;
  lines: ThemeLineHeights;
  icons: ThemeIcons;
  letterSpacing: ThemeLetterSpacing;
  sizes: ThemeSizes &
    ThemeSpacing & {
      width: ScaledSize["width"];
      height: ScaledSize["height"];
    };
}

// For Colour Scheme i.e. Light and Dark Mode
export interface ThemeColors {
  text: ColorValue;
  primary: ColorValue;
  secondary: ColorValue;
  tertiary: ColorValue;
  black: ColorValue;
  white: ColorValue;
  light: ColorValue;
  dark: ColorValue;
  gray: ColorValue;
  danger: ColorValue;
  warning: ColorValue;
  success: ColorValue;
  info: ColorValue;
  card: ColorValue;
  border: ColorValue;
  background: ColorValue;
  shadow: ColorValue;
  overlay: ColorValue;
  focus: ColorValue;
  input: ColorValue;
  switchOn: ColorValue;
  switchOff: ColorValue;
  checkbox: string[];
  checkboxIcon: ColorValue;
  google: ColorValue;
  apple: ColorValue;
  icon: ColorValue;
  blurTint: "light" | "dark" | "default";
  link: ColorValue;
  list: ColorValue;
}

export interface ThemeGradients {
  primary?: string[];
  secondary?: string[];
  tertiary?: string[];
  black?: string[];
  white?: string[];
  light?: string[];
  dark?: string[];
  gray?: string[];
  danger?: string[];
  warning?: string[];
  success?: string[];
  info?: string[];
  divider?: string[];
  menu?: string[];
}

export interface ITheme extends ICommonTheme {
  colors: ThemeColors;
  gradients: ThemeGradients;
}

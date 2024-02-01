// This file contains all the theme related constants
// These constants are COMMON for both the light and dark theme
import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
import type {
  ThemeAssets,
  ThemeFonts,
  ThemeIcons,
  ThemeLetterSpacing,
  ThemeLineHeights,
  ThemeSizes,
  ThemeSpacing,
  ThemeWeights,
  ICommonTheme,
} from "@/types/theme";

const WEIGHTS: ThemeWeights = {
  text: "normal",
  h1: Platform.OS === "ios" ? "700" : "normal",
  h2: Platform.OS === "ios" ? "700" : "normal",
  h3: Platform.OS === "ios" ? "700" : "normal",
  h4: Platform.OS === "ios" ? "700" : "normal",
  h5: Platform.OS === "ios" ? "600" : "normal",
  p: "normal",
  // based on fontWeight
  thin: Platform.OS === "ios" ? "100" : "normal",
  extralight: Platform.OS === "ios" ? "200" : "normal",
  light: Platform.OS === "ios" ? "300" : "normal",
  normal: Platform.OS === "ios" ? "400" : "normal",
  medium: Platform.OS === "ios" ? "500" : "normal",
  semibold: Platform.OS === "ios" ? "600" : "normal",
  bold: Platform.OS === "ios" ? "700" : "normal",
  extrabold: Platform.OS === "ios" ? "800" : "normal",
  black: Platform.OS === "ios" ? "900" : "normal",
};

const ASSETS: ThemeAssets = {
  // backgrounds/logo
  logo: require("../../assets/img/logo.png"),
  background: require("../../assets/img/bg_light.png"),
};

const FONTS: ThemeFonts = {
  // based on font size
  h1: "Manophiser",
  h2: "Manophiser",
  h3: "MontserratMedium",
  h4: "MontserratMedium",
  h5: "MontserratRegular",
  p: "MontserratRegular",
  text: "MontserratRegular",
  // based on fontWeight
  light: "MontserratRegular",
  normal: "MontserratRegular",
  medium: "MontserratMedium",
  semibold: "MontserratMedium",
  bold: "MontserratBold",
  italic: "MontserratItalic",
};

const LINE_HEIGHTS: ThemeLineHeights = {
  // font lineHeight
  text: 22,
  h1: 60,
  h2: 55,
  h3: 43,
  h4: 43,
  h5: 24,
  p: 24,
};

const SIZES: ThemeSizes = {
  // global sizes
  base: 8,
  text: 14,
  radius: 4,
  padding: 20,
  // font sizes
  h1: 38,
  h2: 28,
  h3: 30,
  h4: 30,
  h5: 22,
  p: 22,
  // button sizes
  buttonBorder: 1,
  buttonRadius: 11,
  socialSize: 64,
  socialRadius: 16,
  socialIconSize: 26,
  // button shadow
  shadowOffsetWidth: 0,
  shadowOffsetHeight: 7,
  shadowOpacity: 0.07,
  shadowRadius: 4,
  elevation: 2,
  // input sizes
  inputHeight: 46,
  inputBorder: 0.8,
  inputRadius: 9,
  inputPadding: 12,
  // card sizes
  cardRadius: 16,
  cardPadding: 10,
  // image sizes
  imageRadius: 14,
  avatarSize: 32,
  avatarRadius: 8,
  // switch sizes
  switchWidth: 50,
  switchHeight: 24,
  switchThumb: 20,
  // checkbox sizes
  checkboxWidth: 18,
  checkboxHeight: 18,
  checkboxRadius: 5,
  checkboxIconWidth: 10,
  checkboxIconHeight: 8,
  // Block sizes
  blockRadius: 20,
};

const SPACING: ThemeSpacing = {
  /** xs: 4px */
  xs: SIZES.base * 0.5,
  /** s: 8px */
  s: SIZES.base * 1,
  /** sm: 16px */
  sm: SIZES.base * 2,
  /** m: 24px */
  m: SIZES.base * 3,
  /** md: 32px */
  md: SIZES.base * 4,
  /** l: 40px */
  l: SIZES.base * 5,
  /** xl: 48px */
  xl: SIZES.base * 6,
  /** xxl: 56px */
  xxl: SIZES.base * 7,
};

const LETTER_SPACING: ThemeLetterSpacing = {
  h1: 12,
  h2: 6,
  h3: 9,
  h4: 2,
  h5: 9,
  p: 2,
};

const ICONS: ThemeIcons = {
  check: require("../../assets/icons/check.png"),
  warning: require("../../assets/icons/warning.png"),
  close: require("../../assets/icons/close.png"),
};

export const COMMON_THEME: ICommonTheme = {
  weights: WEIGHTS,
  assets: ASSETS,
  fonts: FONTS,
  lines: LINE_HEIGHTS,
  letterSpacing: LETTER_SPACING,
  icons: ICONS,
  sizes: { width, height, ...SIZES, ...SPACING },
};

// Description: Dark theme colors extending the common theme
import { COMMON_THEME } from "./theme";
import type { ThemeColors, ThemeGradients, ITheme } from "@/types/theme";

const COLORS: ThemeColors = {
  // default text color
  text: "#FEFEFF",
  // base colors
  /** UI color for #primary*/
  primary: "#1CC0E8",
  /** UI color for #secondary*/
  secondary: "#6782E7",
  /** UI color for #tertiary*/
  tertiary: "#DCE2F9",
  // non-colors
  black: "#000000",
  white: "#FFFFFF",
  // gray variations from TW Zinc
  dark: "#374151",
  light: "#e4e4e7",
  // gray variations
  /** UI color for #gray */
  gray: "#374151",
  // colors variations
  /** UI color for #danger */
  danger: "#FF595E",
  /** UI color for #warning */
  warning: "#FFCA3A",
  /** UI color for #success */
  success: "#04F167",
  /** UI color for #info */
  info: "#17C1E8",
  /** UI colors for navigation & card */
  card: "#1B1D22",
  background: "#1B1D22",
  border: "#3f3f46",
  /** UI color for shadowColor */
  shadow: "#374151",
  overlay: "rgba(0,0,0,0.3)",
  /** UI color for input borderColor on focus */
  focus: "#7ecee0",
  input: "#FFFFFF",
  /** UI color for switch checked/active color */
  switchOn: "#1CC0E8",
  switchOff: "#3f3f46",
  /** UI color for checkbox icon checked/active color */
  checkbox: ["#12D7EC", "#26A8E6"],
  checkboxIcon: "#FFFFFF",
  /** social colors */
  google: "#df4a37",
  apple: "#000000",
  /** icon tint color */
  icon: "#FFFFFF",
  /** blur tint color */
  blurTint: "dark",
  /** product link color */
  link: "#FFFFFF",
};

const GRADIENTS: ThemeGradients = {
  primary: ["#12D7EC", "#26A8E6"],
  secondary: ["#6782E7", "#3D60E1"],
  success: ["#04F167", "#03C956"],
  info: ["#1CC0E8", "#6782E7"],
  warning: ["#FBCF33", "#F53939"],
  danger: ["#FF667C", "#EA0606"],
  // gray variations
  light: ["#EBEFF4", "#CED4DA"],
  dark: ["#3A416F", "#141727"],

  white: [String(COLORS.white), "#EBEFF4"],
  black: [String(COLORS.black), "#141727"],

  divider: ["rgba(255,255,255,0)", "rgba(102, 116, 142, 0.6)"],
  menu: [
    "rgba(255, 255, 255, 0.0)",
    "rgba(255, 255, 255, 0.5)",
    "rgba(255, 255, 255, 0.0)",
  ],
};

export const THEME: ITheme = {
  ...COMMON_THEME,
  colors: COLORS,
  gradients: GRADIENTS,
};

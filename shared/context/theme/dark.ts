// Description: Dark theme colors extending the common theme
import { COMMON_THEME } from "./theme";
import type { ThemeColors, ThemeGradients, ITheme } from "@/types/theme";

const COLORS: ThemeColors = {
  // default text color
  text: "#FEFEFF",
  // base colors
  /** UI color for #primary */
  primary: "#14D0EA",
  /** UI color for #secondary */
  secondary: "#7668ED", // '#8392AB',
  /** UI color for #tertiary */
  tertiary: "#DCDCDC",
  // non-colors
  black: "#252F40",
  white: "#FFFFFF",
  dark: "#252F40",
  light: "#E9ECEF",
  // gray variations
  /** UI color for #gray */
  gray: "#A7A8AE",
  // colors variations
  /** UI color for #danger */
  danger: "#EA0606",
  /** UI color for #warning */
  warning: "#FFC107",
  /** UI color for #success */
  success: "#82D616",
  /** UI color for #info */
  info: "#17C1E8",
  /** UI colors for navigation & card */
  card: "#292C3A",
  background: "#1B1D22",
  /** UI color for shadowColor */
  shadow: "#627594",
  overlay: "rgba(0,0,0,0.3)",
  /** UI color for input borderColor on focus */
  focus: "#7ecee0",
  input: "#FFFFFF",
  /** UI color for switch checked/active color */
  switchOn: "#CB0C9F",
  switchOff: "#181A1F",
  /** UI color for checkbox icon checked/active color */
  checkbox: ["#3A416F", "#141727"],
  checkboxIcon: "#FFFFFF",
  /** social colors */
  google: "#3B5998",
  apple: "#55ACEE",
  /** icon tint color */
  icon: "#FFFFFF",
  /** blur tint color */
  blurTint: "dark",
  /** product link color */
  link: "#FFFFFF",
};

const GRADIENTS: ThemeGradients = {
  primary: ["#12D7EC", "#26A8E6"],
  secondary: ["#A8B8D8", "#627594"],
  info: ["#21D4FD", "#2152FF"],
  success: ["#98EC2D", "#17AD37"],
  warning: ["#FBCF33", "#F53939"],
  danger: ["#ed3b55", "#EA0606"],

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

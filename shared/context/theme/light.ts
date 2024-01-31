// Description: Light theme colors extending the common theme
import { COMMON_THEME } from "./theme";
import type { ThemeColors, ThemeGradients, ITheme } from "@/types/theme";

const COLORS: ThemeColors = {
  // default text color
  text: "#424242",
  // base colors
  /** UI color for #primary */
  primary: "#12D7EC",
  /** UI color for #secondary */
  secondary: "#7668ED", // '#8392AB',
  /** UI color for #tertiary */
  tertiary: "#DCDCDC",
  // non-colors
  black: "#252F40",
  white: "#FFFFFF",
  // gray variations
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
  card: "#FFFFFF",
  background: "#F4F5FA",
  /** UI color for shadowColor */
  shadow: "#000000",
  overlay: "rgba(0,0,0,0.3)",
  /** UI color for input borderColor on focus */
  focus: "#7ecee0",
  input: "#252F40",
  /** UI color for switch checked/active color */
  switchOn: "#3A416F",
  switchOff: "#E9ECEF",
  /** UI color for checkbox icon checked/active color */
  checkbox: ["#3A416F", "#141727"],
  checkboxIcon: "#FFFFFF",
  /** social colors */
  google: "#3B5998",
  apple: "#55ACEE",
  /** icon tint color */
  icon: "#8392AB",
  /** blur tint color */
  blurTint: "light",
  /** product link color */
  link: "#3C77E0",
};

const GRADIENTS: ThemeGradients = {
  primary: ["#21d4fd", "#8052ff"],
  secondary: ["#A8B8D8", "#627594"],
  info: ["#21D4FD", "#2152FF"],
  success: ["#98EC2D", "#17AD37"],
  warning: ["#FBCF33", "#F53939"],
  danger: ["#FF667C", "#EA0606"],
  // gray variations
  light: ["#EBEFF4", "#CED4DA"],
  dark: ["#3A416F", "#141727"],
  // Black / White
  white: [String(COLORS.white), "#EBEFF4"],
  black: [String(COLORS.black), "#141727"],
  // Misc
  divider: ["rgba(255,255,255,0.3)", "rgba(102, 116, 142, 0.6)"],
  menu: [
    "rgba(255, 255, 255, 0.2)",
    "rgba(112, 125, 149, 0.5)",
    "rgba(255, 255, 255, 0.2)",
  ],
};

export const THEME: ITheme = {
  ...COMMON_THEME,
  colors: COLORS,
  gradients: GRADIENTS,
};

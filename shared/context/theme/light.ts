// Description: Light theme colors extending the common theme
import { COMMON_THEME } from "./theme";
import type { ThemeColors, ThemeGradients, ITheme } from "@/types/theme";

const COLORS: ThemeColors = {
  // default text color
  text: "#52525b",
  // base colors
  /** UI color for #primary*/
  primary: "#1CC0E8",
  /** UI color for #secondary*/
  secondary: "#6782E7",
  /** UI color for #tertiary*/
  tertiary: "#222458",
  // non-colors
  black: "#000000",
  white: "#FFFFFF",
  // gray variations from TW Zinc
  dark: "#374151",
  light: "#e4e4e7",
  // gray variations
  /** UI color for #gray */
  gray: "#71717a",
  // colors variations
  /** UI color for #danger */
  danger: "#FF595E",
  /** UI color for #warning */
  warning: "#FFCA3A",
  /** UI color for #success */
  success: "#04F167",
  /** UI color for #info */
  info: "#17C1E8",
  /** UI colors for navigation & card  */
  card: "#FFFFFF", // 🧐
  background: "#fefeff",
  border: "#d4d4d8",
  /** UI color for shadowColor 🧐 */
  shadow: "#000000",
  overlay: "rgba(0,0,0,0.3)",
  /** UI color for input borderColor on focus 🧐 */
  focus: "#7ecee0",
  input: "#252F40",
  /** UI color for switch checked/active color 🧐 */
  switchOn: "#1CC0E8",
  switchOff: "#E9ECEF",
  /** UI color for checkbox icon checked/active color 🧐 */
  checkbox: ["#12D7EC", "#26A8E6"],
  checkboxIcon: "#FFFFFF",
  /** social colors 🧐*/
  google: "#df4a37",
  apple: "#000000",
  /** icon tint color 🧐*/
  icon: "#8392AB",
  /** blur tint color 🧐*/
  blurTint: "light",
  /** product link color 🧐*/
  link: "#6782E7",
  /** List Color */
  list: "#f2f4f9",
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
  // Black / White
  white: [String(COLORS.white), "#EBEFF4"],
  black: [String(COLORS.black), "#222458"],
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

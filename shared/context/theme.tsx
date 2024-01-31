// React Context Provider for Themes i.e Dark Mode and Light Mode
import { createContext, useContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
// import theme constants
import { THEME as dark } from "./theme/dark";
import { THEME as light } from "./theme/light";
import { ITheme } from "./theme/light";

type ThemeContext = {
  isDark: boolean;
  handleIsDark: () => void;
  theme: ITheme;
};

const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<ITheme>(light);
  const { getItem: getIsDark, setItem: setAsyncIsDark } =
    useAsyncStorage("IS_DARK");

  // Load Is Dark from storage on first load
  useEffect(() => {
    let isMounted = true;
    // Get Is Dark Data
    getIsDark().then((json) => {
      if (!isMounted) return;
      if (json != null) {
        const isDarkJSON = json;
        if (isDarkJSON !== null) {
          // set isDark / compare if has updated
          setIsDark(JSON.parse(isDarkJSON));
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // handle isDark mode
  const handleIsDark = () => {
    setIsDark(!isDark);
    setAsyncIsDark(JSON.stringify(!isDark));
  };

  // change theme based on isDark updates
  useEffect(() => {
    setTheme(isDark ? dark : light);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, handleIsDark, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

import { ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../theme";

export interface themeContextTypes {
  mode: "light" | "dark";
  handleSetTheme: (newMode: "light" | "dark") => void;
}
const ThemeContext = createContext<themeContextTypes>({
  mode: "light",
  handleSetTheme: (newMode) => {
    return newMode;
  },
});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const handleSetTheme = (newMode: "light" | "dark") => {
    setMode(newMode);
    localStorage.setItem("chatting theme", newMode);
  };
  const themeMap = {
    light: lightTheme,
    dark: darkTheme,
  };

  useEffect(() => {
    const localMode = localStorage.getItem("chatting theme");

    if (localMode) {
      setMode(localMode as "light" | "dark");
    } else {
      setMode("light");
    }
  });
  return (
    <ThemeContext.Provider value={{ mode, handleSetTheme }}>
      <ThemeProvider theme={themeMap[mode]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default ThemeContextProvider;

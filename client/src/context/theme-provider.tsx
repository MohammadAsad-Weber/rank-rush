import { createContext, useEffect, useState } from "react";
import type { Theme, ThemeProviderProps, ThemeProviderState } from "./type";

// Initial Values
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};
// Creating Context
export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Context Provider
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "climb-board-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

  // Run whenever the theme changes
  useEffect(() => {
    // Select document's element and remove all classes associated with Theme
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    // Check if the Theme is set to System
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    // Set the Theme
    root.classList.add(theme);
  }, [theme]);

  // Values to be provided to the context
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export default ThemeProvider;

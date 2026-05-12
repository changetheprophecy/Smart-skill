// ThemeContext — manages dark/light mode across the app
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Apply theme to the HTML element (DaisyUI reads data-theme attribute)
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "skilldark" : "skilllight"
    );
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for easy access
export const useTheme = () => useContext(ThemeContext);

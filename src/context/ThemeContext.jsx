// ThemeContext — manages dark/light mode across the app

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

/* ---------------- HELPERS ---------------- */

const THEME_KEY = "skill-theme";

const getSystemTheme = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getSavedTheme = () => {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return null;
};

/* ---------------- PROVIDER ---------------- */

export function ThemeProvider({ children }) {
  // true = dark, false = light
  const [isDark, setIsDark] = useState(() => {
    const saved = getSavedTheme();
    return saved !== null ? saved : getSystemTheme();
  });

  // apply theme to DOM (DaisyUI uses this)
  useEffect(() => {
    const themeName = isDark ? "skilldark" : "skilllight";
    console.log("Applying theme:", themeName);

    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  /* Optional: auto-update if system theme changes (only if user never manually set) */
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e) => {
      const saved = localStorage.getItem(THEME_KEY);
      if (!saved) setIsDark(e.matches);
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  /* ---------------- ACTIONS ---------------- */

  const toggleTheme = () => {
    console.log("Toggle theme called, current isDark:", isDark);
    setIsDark((prev) => {
      console.log("Setting isDark to:", !prev);
      return !prev;
    });
  };

  const setTheme = (mode) => {
    if (mode === "dark") setIsDark(true);
    else if (mode === "light") setIsDark(false);
  };

  /* ---------------- CONTEXT VALUE ---------------- */

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        setTheme,
        theme: isDark ? "dark" : "light",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
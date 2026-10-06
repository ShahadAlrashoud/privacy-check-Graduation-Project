"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type Lang = "en" | "ar";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  theme: "light",
  toggleTheme: () => {},
  lang: "en",
  setLang: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");

    const savedLang = (localStorage.getItem("lang") as Lang) || "en";
    setLang(savedLang);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <SessionProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme, lang, setLang: handleSetLang }}>
        {children}
      </ThemeContext.Provider>
    </SessionProvider>
  );
}
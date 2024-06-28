import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useEffect } from "react";

export enum Theme {
  dark = "dark",
  light = "light",
}

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme") as Theme;

  if (savedTheme) {
    return savedTheme || Theme.light;
  }

  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Theme.dark
      : Theme.light;
  }
  return Theme.dark;
};

export const themeAtom = atomWithStorage<Theme>(
  "theme",
  getInitialTheme(),
  createJSONStorage(() => localStorage)
);

export default function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (!localStorage.getItem("theme")) {
        setTheme(mediaQuery.matches ? Theme.dark : Theme.light);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.dark ? Theme.light : Theme.dark
    );
  };

  return { toggleTheme, theme };
}

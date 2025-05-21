"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiMiniSun, HiMoon } from "react-icons/hi2";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  let themeChangeIcon;
  useEffect(() => setMounted(true), []);

  switch (resolvedTheme) {
    case "dark":
      themeChangeIcon = (
        <HiMiniSun
          onClick={() => setTheme("light")}
          className="h-6 w-6 text-text cursor-pointer"
        />
      );
      break;
    case "light":
      themeChangeIcon = (
        <HiMoon
          onClick={() => setTheme("dark")}
          className="h-6 w-6 text-text cursor-pointer"
        />
      );
      break;
    default:
      themeChangeIcon = (
        <HiMoon
          onClick={() => setTheme("dark")}
          className="h-6 w-6 text-text cursor-pointer"
        />
      );
      break;
  }

  if (!mounted) return null;
  return themeChangeIcon;
}

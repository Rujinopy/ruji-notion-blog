import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }


  return (
    <button
      className={`w-fit p-2 rounded-md hover:scale-125 active:scale-125 scale-150 duration-200 `}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
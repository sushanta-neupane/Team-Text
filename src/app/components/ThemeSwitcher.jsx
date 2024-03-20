"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { TbSun, TbMoon } from "react-icons/tb";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Button isIconOnly variant="flat" onClick={toggleTheme}>
        {theme === 'light' ? <TbMoon /> : <TbSun />}
      </Button>
    </>
  );
}

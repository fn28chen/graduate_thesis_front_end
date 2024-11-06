import ICMoon from "@/components/icon/ICMoon";
import ICSun from "@/components/icon/ICSun";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <Button
      size={null}
      variant="ghost"
      className="h-12 w-12 rounded-full"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <ICSun /> : <ICMoon />}
    </Button>
  );
}

export default ThemeToggle;

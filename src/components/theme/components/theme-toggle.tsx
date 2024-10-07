import ICMoon from "@/components/icon/ICMoon";
import ICSun from "@/components/icon/ICSun";
import { useTheme } from "next-themes";
import React from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button
      className="flex items-center justify-center rounded bg-zinc-700 shadow duration-300 ease-in-out hover:scale-110 hover:bg-zinc-800 hover:shadow-xl dark:bg-zinc-800 dark:hover:bg-zinc-700"
      onClick={toggleTheme}
    >
      <div className="p-2 text-zinc-100">
        {theme === "dark" ? <ICSun /> : <ICMoon />}
      </div>
    </button>
  );
}

export default ThemeToggle;

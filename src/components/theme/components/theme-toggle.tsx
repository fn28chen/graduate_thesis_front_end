import { useTheme } from "next-themes";
import React from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div>
      <button onClick={toggleTheme} className="toggle-theme">
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeToggle;

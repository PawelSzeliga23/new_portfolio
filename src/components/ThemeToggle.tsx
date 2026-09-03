import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { MoonIcon, SunIcon } from "./ThemeIcons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      data-cursor-hover
      className="relative flex h-8 w-14 items-center rounded-full border border-[var(--border-strong)] px-1 cursor-pointer"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--fg)] text-[var(--bg)] text-[11px]"
        style={{ marginLeft: isDark ? "auto" : 0 }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </motion.span>
    </button>
  );
}

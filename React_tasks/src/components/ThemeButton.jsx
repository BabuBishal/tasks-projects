import { useTheme } from "../context/ThemeProvider";
import "../styles/component/themeButton.css";
const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <span className="theme-btn" onClick={toggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </span>
  );
};

export default ThemeButton;

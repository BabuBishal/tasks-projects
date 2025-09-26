import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const th = theme === "light" ? "dark" : "light";
    setTheme(th);
    // document.documentElement.setAttribute("data-theme", th);
    // localStorage.setItem("theme", th);
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};
export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);

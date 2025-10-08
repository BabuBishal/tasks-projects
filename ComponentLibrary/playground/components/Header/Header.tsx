import Toggle from "../../../src/components/Toggle/Toggle";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Header.module.css";
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={styles.header}>
      <h3>B3</h3>
      <Toggle
        checkedText="☀️"
        uncheckedText="🌙"
        checked={theme === "dark"}
        onChange={() => toggleTheme()}
      />
    </header>
  );
};

export default Header;

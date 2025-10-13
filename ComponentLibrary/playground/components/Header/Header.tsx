import Toggle from "../../../src/components/Toggle/Toggle";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Header.module.css";
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <h3 className={styles.headerIcon}>UI Library</h3>
        <ul className={styles.navmenu}>
          <li className={styles.navitem}>Components</li>
          <li className={styles.navitem}>Documentation</li>
        </ul>
        <Toggle
          checkedText="☀️"
          uncheckedText="🌙"
          checked={theme === "dark"}
          onChange={() => toggleTheme()}
        />
      </nav>
    </header>
  );
};

export default Header;

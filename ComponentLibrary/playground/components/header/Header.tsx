import Toggle from "../../../src/components/toggle/Toggle";
import { useTheme } from "../../context/themeContext";
import styles from "./Header.module.css";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {onMenuClick && (
          <button
            className={styles.menuButton}
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        )}
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

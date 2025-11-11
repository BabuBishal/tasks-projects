import styles from "./Sidebar.module.css";
import {
  componentList,
  gettingStartedList,
  customHooksList,
} from "../../../src/utils/constants";
import { useEffect } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {

  const entries = useIntersectionObserver({
    selector: "section[id]",
    threshold: 0.1, 
  });

  // Only highlight the topmost visible section to avoid multiple highlights
  useEffect(() => {
    const navLinks = document.querySelectorAll("[data-sidebar-link]");

    // Find the topmost (first) intersecting section
    const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
    const topmostEntry =
      intersectingEntries.length > 0 ? intersectingEntries[0] : null;

    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href");
      const isLinkActive =
        topmostEntry && linkHref === `#${topmostEntry.target.id}`;
      link.classList.toggle(`${styles.active}`, !!isLinkActive);
    });
  }, [entries]);

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarSection}>
          <h4 className={styles.sidebarTitle}>Getting Started</h4>
          {gettingStartedList?.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-sidebar-link
              onClick={handleLinkClick}
              className={styles.sidebarLink}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className={styles.sidebarSection}>
          <h4 className={styles.sidebarTitle}>Components</h4>
          {componentList?.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-sidebar-link
              onClick={handleLinkClick}
              className={styles.sidebarLink}
            >
              {item.component}
            </a>
          ))}
        </div>
        <div className={styles.sidebarSection}>
          <h4 className={styles.sidebarTitle}>Custom Hooks</h4>
          {customHooksList?.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-sidebar-link
              onClick={handleLinkClick}
              className={styles.sidebarLink}
            >
              {item.title}
            </a>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

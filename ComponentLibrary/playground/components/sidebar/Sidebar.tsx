import styles from "./Sidebar.module.css";
import {
  componentList,
  gettingStartedList,
  customHooksList,
} from "../../../src/utils/constants";
import { useLocation } from "react-router";
import { useEffect } from "react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.hash;

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("[data-sidebar-link]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                `${styles.active}`,
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      {
        threshold: 0.6,
      }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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
          {gettingStartedList?.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                data-sidebar-link
                onClick={handleLinkClick}
                className={`${styles.sidebarLink} ${
                  isActive ? styles.active : ""
                }`}
              >
                {item.title}
              </a>
            );
          })}
        </div>
        <div className={styles.sidebarSection}>
          <h4 className={styles.sidebarTitle}>Components</h4>
          {componentList?.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                data-sidebar-link
                onClick={handleLinkClick}
                className={`${styles.sidebarLink} ${
                  isActive ? styles.active : ""
                }`}
              >
                {item.component}
              </a>
            );
          })}
        </div>
        <div className={styles.sidebarSection}>
          <h4 className={styles.sidebarTitle}>Custom Hooks</h4>
          {customHooksList?.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                data-sidebar-link
                onClick={handleLinkClick}
                className={`${styles.sidebarLink} ${
                  isActive ? styles.active : ""
                }`}
              >
                {item.title}
              </a>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

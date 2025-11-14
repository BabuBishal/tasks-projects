import styles from "./Sidebar.module.css";
import {
  componentList,
  gettingStartedList,
  customHooksList,
} from "../../../../utils/constants";
import { useMemo } from "react";
import { useIntersectionObserverNoRef } from "../../../hooks/useIntersectionObserver";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const entries = useIntersectionObserverNoRef({
    selector: "section[id]",
    threshold: 0.2,
  });

  const activeId = useMemo(() => {
    const topmostEntry = entries.filter((entry) => entry.isIntersecting).at(0);

    return topmostEntry ? topmostEntry.target.id : null;
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
        {/* --- Getting Started Section --- */}
        <div className={styles.sidebarSection}>
          <h4 className={styles.sidebarTitle}>Getting Started</h4>
          {gettingStartedList?.map((item) => {
            const linkId = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                data-sidebar-link
                onClick={handleLinkClick}
                className={`${styles.sidebarLink} ${
                  linkId === activeId ? styles.active : ""
                }`}
              >
                {item.title}
              </a>
            );
          })}
        </div>

        {/* --- Components Section --- */}
        <div className={styles.sidebarSection}>
          <h4 className={styles.sidebarTitle}>Components</h4>
          {componentList?.map((item) => {
            const linkId = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                data-sidebar-link
                onClick={handleLinkClick}
                className={`${styles.sidebarLink} ${
                  linkId === activeId ? styles.active : ""
                }`}
              >
                {item.component}
              </a>
            );
          })}
        </div>

        {/* --- Custom Hooks Section --- */}
        <div className={styles.sidebarSection}>
          <h4 className={styles.sidebarTitle}>Custom Hooks</h4>
          {customHooksList?.map((item) => {
            const linkId = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                data-sidebar-link
                onClick={handleLinkClick}
                className={`${styles.sidebarLink} ${
                  linkId === activeId ? styles.active : ""
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

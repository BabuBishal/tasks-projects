import styles from "./Sidebar.module.css";
import {
  componentList,
  gettingStartedList,
  customHooksList,
} from "../../../src/utils/constants";
import { useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.hash;
  console.log(currentPath);
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <h4 className={styles.sidebarTitle}>Getting Started</h4>
        {gettingStartedList?.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
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
              className={`${styles.sidebarLink} ${
                isActive ? styles.active : ""
              }`}
            >
              {item.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

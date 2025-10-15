import styles from "./Sidebar.module.css";
// const componentList = [];
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <h4 className={styles.sidebarTitle}>Getting Started</h4>
        <a href="#intro-section" className={styles.sidebarLink}>
          Introduction
        </a>
        <a href="#" className={styles.sidebarLink}>
          Installation
        </a>
      </div>
      <div className={styles.sidebarSection}>
        <h4 className={styles.sidebarTitle}>Components</h4>
        <a href="#button-section" className={styles.sidebarLink}>
          Buttons
        </a>
        <a href="#form-section" className={styles.sidebarLink}>
          Form Elements
        </a>
      </div>
    </div>
  );
};

export default Sidebar;

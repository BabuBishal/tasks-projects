import styles from "./Sidebar.module.css";
// const componentList = [];
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <h4 className={styles.sidebarTitle}>Getting Started</h4>
        <a href="#introduction" className={styles.sidebarLink}>
          Introduction
        </a>
        <a href="#" className={styles.sidebarLink}>
          Installation
        </a>
      </div>
      <div className={styles.sidebarSection}>
        <h4 className={styles.sidebarTitle}>Components</h4>
        <a href="#buttons" className={styles.sidebarLink}>
          Buttons
        </a>
        <a href="#form-elements" className={styles.sidebarLink}>
          Form Elements
        </a>
      </div>
    </div>
  );
};

export default Sidebar;

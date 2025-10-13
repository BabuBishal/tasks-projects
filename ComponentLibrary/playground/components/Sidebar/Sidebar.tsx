import styles from "./Sidebar.module.css";
// const componentList = [];
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <h4 className={styles.sidebarTitle}>Getting Started</h4>
        <h5 className={styles.sidebarLink}>Introduction</h5>
        <h5 className={styles.sidebarLink}>Installation</h5>
      </div>
      <div className={styles.sidebarSection}>
        <h4 className={styles.sidebarTitle}>Components</h4>
        <h5 className={styles.sidebarLink}>Buttons</h5>
        <h5 className={styles.sidebarLink}>Cards</h5>
      </div>
    </div>
  );
};

export default Sidebar;

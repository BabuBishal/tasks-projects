import styles from "./useWindowSizeDemo.module.css";

import useWindowSize from "../../../playground/hooks/useWindowSize";

const UseWindowSizeDemo = () => {
  const windowSize = useWindowSize();
  return (
    <div className={styles.container}>
      <h2 className={styles.label}>UseWindowSize Demo</h2>
      <p className={styles.desc}>The window size is currently:</p>
      <p className={styles.desc}>Window Width: {windowSize?.width}</p>
      <p className={styles.desc}>Window Height: {windowSize?.height}</p>
    </div>
  );
};

export default UseWindowSizeDemo;

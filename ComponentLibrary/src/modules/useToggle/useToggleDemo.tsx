import { useToggle } from "../../../playground/hooks/useToggle";
import { Button } from "../../components/button/Button";
import styles from "./useToggleDemo.module.css";

const UseToggleDemo = () => {
  const [isOn, toggle] = useToggle(false);
  return (
    <div className={styles.container}>
      <h2 className={styles.label}>useToggle Demo</h2>
      <p className={styles.desc}>
        The toggle is currently: {isOn ? "ON" : "OFF"}
      </p>
      <Button variant="primary" onClick={toggle}>
        Toggle
      </Button>
    </div>
  );
};

export default UseToggleDemo;

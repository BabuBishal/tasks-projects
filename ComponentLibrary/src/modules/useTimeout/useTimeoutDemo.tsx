import styles from "../useToggle/useToggleDemo.module.css";
import { Button } from "../../components/button/Button";
import { useTimeout } from "../../../playground/hooks/useTimeout";
import { useState } from "react";


const UseTimeoutDemo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");

  const showStatus = (msg: string) => {
    setMessage(msg);
    setIsVisible(true);
  };

  useTimeout(
    () => {
      setIsVisible(false);
      setMessage("");
    },
    isVisible ? 3000 : null
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.label}>useTimeout Demo</h2>
      {/* <p className={styles.desc}></p> */}
      {isVisible && (
        <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
      )}
      <Button
        variant="outline"
        onClick={() =>
          showStatus("Timeout started! Message will disappear in 3 seconds.")
        }
      >
        Start Timeout
      </Button>
    </div>
  );
};

export default UseTimeoutDemo;

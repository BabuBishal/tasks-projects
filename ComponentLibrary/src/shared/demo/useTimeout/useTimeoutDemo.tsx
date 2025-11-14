import styles from "./useTimeoutDemo.module.css";
import { Button } from "../../ui/button/Button";
import { useTimeout } from "../../../hooks/useTimeout";
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
      {/* <h2 className={styles.label}>useTimeout Demo</h2> */}
      <Button
        variant="outline"
        onClick={() =>
          showStatus("Timeout started! Message will disappear in 3 seconds.")
        }
      >
        Start Timeout
      </Button>
      {isVisible && (
        <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
};

export default UseTimeoutDemo;

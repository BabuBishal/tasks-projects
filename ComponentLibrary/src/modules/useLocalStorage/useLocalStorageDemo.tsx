import { useEffect, useState } from "react";
import styles from "./useLocalStorageDemo.module.css";
import { useLocalStorage } from "../../../playground/hooks/useLocalStorage";
import { Button } from "../../components/button/Button";

export default function UseLocalStorageDemo() {
  const [stored, setStored, removeStored] = useLocalStorage<string>(
    "localstorage-demo",
    ""
  );

  const [input, setInput] = useState<string>(stored ?? "");

  useEffect(() => {
    setInput(stored ?? "");
  }, [stored]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>useLocalStorage Demo</h3>

      <div className={styles.controls}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a value and click Save"
        />

        <Button variant="primary" onClick={() => setStored(input)}>
          Save
        </Button>

        {/* <Button
          variant="secondary"
          onClick={() => setStored((prev) => `${prev ?? ""} ★`)}
        >
          Append ★
        </Button> */}

        <Button variant="danger" onClick={() => removeStored()}>
          Remove
        </Button>
      </div>

      <div className={styles.info}>
        <strong>Stored value:</strong>
        <pre className={styles.pre}>{JSON.stringify(stored)}</pre>
      </div>
    </div>
  );
}

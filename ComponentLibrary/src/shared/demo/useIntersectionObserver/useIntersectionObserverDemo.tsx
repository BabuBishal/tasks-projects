import { useIntersectionObserverSingle } from "../../../hooks/useIntersectionObserver1";
import styles from "./useIntersectionObserverDemo.module.css";

function Card({ n }: { n: number }) {
  const [isVisible, ref] = useIntersectionObserverSingle({
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`${styles.demoCard} ${isVisible ? styles.visible : ""}`}
    >
      <h3 className={styles.title}>Card {n}</h3>
      <p className={styles.desc}>{isVisible ? "Visible" : "Hidden"}</p>
    </div>
  );
}

export default function UseIntersectionObserverDemoSimple() {
  return (
    <div className={styles.demoContainer}>
      {[1, 2, 3, 4].map((n) => (
        <Card key={n} n={n} />
      ))}
    </div>
  );
}

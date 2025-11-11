import { useIntersectionObserver } from "../../../playground/hooks/useIntersectionObserver";
import styles from "./useIntersectionObserverDemo.module.css";

const useIntersectionObserverDemo = () => {
  const entries = useIntersectionObserver({
    threshold: 0.2,
    selector: "[data-intersect]",
  });
  return (
    <div className={styles.demoContainer}>
      {[1, 2, 3, 4, 5, 6].map((n) => {
        const entry = entries.find((e: any) => e.target.id === `card-${n}`);
        const isVisible = entry?.isIntersecting ?? false;

        return (
          <div
            key={n}
            id={`card-${n}`}
            data-intersect
            className={`${styles.demoCard} ${isVisible ? styles.visible : ""}`}
          >
            <h3 className={styles.title}>Card {n}</h3>
            <p className={styles.desc}>
              This card fades in when visible.
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default useIntersectionObserverDemo;

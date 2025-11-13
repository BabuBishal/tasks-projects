import { useIntersectionObserver } from "../../../playground/hooks/useIntersectionObserver1";
import styles from "./useIntersectionObserverDemo.module.css";

const useIntersectionObserverDemo = () => {
  const [entries, ref] = useIntersectionObserver({
    threshold: 0.2,
    call: () => {},
  });
  return (
    <div className={styles.demoContainer}>
      {[1, 2, 3, 4].map((n) => {
        const entry = entries.find((e: any) => e.target.id === `card-${n}`);
        console.log("entry", entry);
        const isVisible = entry?.isIntersecting ?? false;
        console.log(isVisible);

        return (
          <div
            key={n}
            id={`card-${n}`}
            ref={ref}
            className={`${styles.demoCard} ${isVisible ? styles.visible : ""}`}
          >
            <h3 className={styles.title}>Card {n}</h3>
            <p className={styles.desc}>This card fades in when visible.</p>
          </div>
        );
      })}
    </div>
  );
};

export default useIntersectionObserverDemo;

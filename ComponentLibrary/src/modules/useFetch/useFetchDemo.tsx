import {useFetch} from "../../../playground/hooks/useFetch";
import styles from "./useFetchDemo.module.css";

export default function UseFetchDemo() {
  const { data, loading, error } = useFetch<any>("https://jsonplaceholder.typicode.com/posts/1");

  return (
    <div className={styles.hookDemo}>
      <h3 className={styles.title}>useFetch Demo</h3>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error.message}</p>}
      {data && (
        <div className={styles.dataContainer}>
          <h4>{data.title}</h4>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}

import UseFetchDemo from "../../../src/modules/useFetch/useFetchDemo";
import CodeBlock from "../../components/CodeBlock/CodeBlock";
import Container from "../../components/Container/Container";

const UseFetchPage = () => {
  return (
    <section id="useFetch" className="section useFetch-section">
      <h2 className="section-heading">UseFetch hook</h2>
      <Container
        title="useFetch"
        desc="Custom hook for fetching data from an API"
        content={<UseFetchDemo />}
        codeContent={
          <CodeBlock
            code={`  const { data, loading, error } = useFetch<any>("https://jsonplaceholder.typicode.com/posts/1");

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
  );`}
          />
        }
      />
    </section>
  );
};

export default UseFetchPage;

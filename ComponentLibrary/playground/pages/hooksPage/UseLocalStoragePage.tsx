import UseLocalStorageDemo from "../../../src/modules/useLocalStorage/useLocalStorageDemo";
import CodeBlock from "../../components/codeBlock/CodeBlock";
import Container from "../../components/container/Container";
const UseLocalStorageCode = `const [stored, setStored, removeStored] = useLocalStorage<string>(
    "demo:localstorage",
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
        
        <Button variant="danger" onClick={() => removeStored()}>
          Remove
        </Button>
      </div>

      <div className={styles.info}>
        <strong>Stored value:</strong>
        <pre className={styles.pre}>{JSON.stringify(stored)}</pre>
      </div>
    </div>
  );`;

const UseLocalStoragePage = () => {
  return (
    <section id="useLocalStorage" className="section useLocalStorage-section">
      <h2 className="section-heading">UseLocalStorage hook</h2>
      <Container
        title="useLocalStorage"
        desc="Custom hook for storing, updating or removing data from local storage"
        content={<UseLocalStorageDemo />}
        codeContent={<CodeBlock code={UseLocalStorageCode} />}
      />
    </section>
  );
};

export default UseLocalStoragePage;

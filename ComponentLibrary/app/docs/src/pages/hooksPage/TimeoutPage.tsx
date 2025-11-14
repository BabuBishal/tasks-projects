import Container from "../../shared/templates/container/Container";
import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";
import UseTimeoutDemo from "../../shared/demo/useTimeout/useTimeoutDemo";

const UseTimeoutCode = `const [isVisible, setIsVisible] = useState(true);
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
  );`;

const TimeoutPage = () => {
  return (
    <section id="useTimeout" className="section useTimeout-section">
      <h2 className="section-heading">UseTimeout hook</h2>
      <Container
        title="useTimeout"
        desc="Custom hook to execute a function after a specified delay"
      >
        <Container.content>
          <UseTimeoutDemo />
        </Container.content>
        <Container.code>
          <CodeBlock code={UseTimeoutCode} />
        </Container.code>
      </Container>
    </section>
  );
};

export default TimeoutPage;

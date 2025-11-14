import Container from "../../shared/templates/container/Container";
import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";
import UseWindowSizeDemo from "../../shared/demo/useWindowSize/useWindowSizeDemo";

const WindowSizeCode = ` const windowSize = useWindowSize();
  return (
    <div className={styles.container}>
      <h2 className={styles.label}>UseWindowSize Demo</h2>
      <p className={styles.desc}>The window size is currently:</p>
      <p className={styles.desc}>Window Width: {windowSize?.width}</p>
      <p className={styles.desc}>Window Height: {windowSize?.height}</p>
    </div>
  );`;

const UseWindowSizePage = () => {
  return (
    <section id="useWindowSize" className="section useToggle-section">
      <h2 className="section-heading">UseWindowSize hook</h2>
      <Container
        title="useWindowSize"
        desc="Custom hook to get the current window size and update on resize"
      >
        <Container.content>
          <UseWindowSizeDemo />
        </Container.content>
        <Container.code>
          <CodeBlock code={WindowSizeCode} />
        </Container.code>
      </Container>
    </section>
  );
};

export default UseWindowSizePage;

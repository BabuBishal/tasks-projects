import Container from "../../shared/templates/container/Container";
import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";
import UseIntersectionObserverDemo from "../../shared/demo/useIntersectionObserver/useIntersectionObserverDemo";

const UseIntersectionObserverCode = `const [isVisible, ref] = useIntersectionObserverSingle({
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={\`\${styles.demoCard} \${isVisible ? styles.visible : ""}\`}
    >
      <h3 className={styles.title}>Card \${n}</h3>
      <p className={styles.desc}>\${isVisible ? "✓ Visible" : "Hidden"}</p>
    </div>
  );`;

const UseIntersectionObserverPage = () => {
  return (
    <section
      id="useIntersectionObserver"
      className="section useIntersectionObserver-section"
    >
      <h2 className="section-heading">UseIntersectionObserver hook</h2>
      <Container
        title="useIntersectionObserver"
        desc="Custom hook to observe visibility of elements within the viewport"
      >
        <Container.content>
          <UseIntersectionObserverDemo />
        </Container.content>
        <Container.code>
          <CodeBlock code={UseIntersectionObserverCode} />
        </Container.code>
      </Container>
    </section>
  );
};

export default UseIntersectionObserverPage;

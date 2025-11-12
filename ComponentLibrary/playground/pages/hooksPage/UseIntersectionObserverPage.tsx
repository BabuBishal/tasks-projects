import Container from "../../components/container/Container";
import CodeBlock from "../../components/codeBlock/CodeBlock";
import UseIntersectionObserverDemo from "../../../src/modules/useIntersectionObserver/useIntersectionObserverDemo";

const UseIntersectionObserverCode = `const entries = useIntersectionObserver({
    threshold: 0.2,
    selector: "[data-intersect]",
  });
  return (
    <div className={styles.demoContainer}>
      {[1, 2, 3, 4, 5, 6].map((n) => {
        const entry = entries.find((e: any) => e.target.id === 'card-$ {n}');
        const isVisible = entry?.isIntersecting ?? false;

        return (
          <div
            key={n}
            id={'card-$ {n}'}
            data-intersect
            className={'$ {styles.demoCard} $ {isVisible ? styles.visible : ""}'}
          >
            <h3 className={styles.title}>Card {n}</h3>
            <p className={styles.desc}>
              This card fades in when visible.
            </p>
          </div>
        );
      })}
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

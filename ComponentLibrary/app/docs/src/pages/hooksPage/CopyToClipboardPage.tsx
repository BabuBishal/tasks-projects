import Container from "../../shared/templates/container/Container";
import UseCopyToClipboardDemo from "../../shared/demo/useCopyToClipBoard/useCopyToClipboardDemo";
import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";

const CopyToClipboardCode = `const [text, setText] = useState("Copy this text!");
  const { copiedText, copy } = useCopyToClipboard();

  return (
    <div className={styles.container}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.input}
      />

      <Button variant="primary" onClick={() => copy(text)}>
        {copiedText === text ? "Copied!" : "Copy"}
      </Button>
    </div>
  );`;

const CopyToClipboardPage = () => {
  return (
    <section
      id="useCopyToClipboard"
      className="section copyToClipboard-section"
    >
      <h2 className="section-heading">UseCopyToClipboard hook</h2>
      <Container
        title="useCopyToClipboard"
        desc="Hook to copy text to clipboard"
      >
        <Container.content>
          <UseCopyToClipboardDemo />
        </Container.content>
        <Container.code>
          <CodeBlock code={CopyToClipboardCode} />
        </Container.code>
      </Container>
    </section>
  );
};

export default CopyToClipboardPage;

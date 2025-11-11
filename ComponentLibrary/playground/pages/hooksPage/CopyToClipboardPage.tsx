import Container from "../../components/container/Container";
import UseCopyToClipboardDemo from "../../../src/modules/useCopyToClipBoard/useCopyToClipboardDemo";
import CodeBlock from "../../components/codeBlock/CodeBlock";

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
        content={<UseCopyToClipboardDemo />}
        codeContent={
          <CodeBlock
            code={` const [text, setText] = useState("Copy this text!");
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
  );`}
          />
        }
      />
    </section>
  );
};

export default CopyToClipboardPage;

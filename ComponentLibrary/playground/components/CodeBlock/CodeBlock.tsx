import styles from "./CodeBlock.module.css";
const CodeBlock = ({ code }: { code: string }) => {
  return (
    <pre className={styles.codeBlock}>
      <p className={styles.title}>Code Example</p>
      <code>{code}</code>
    </pre>
  );
};

export default CodeBlock;

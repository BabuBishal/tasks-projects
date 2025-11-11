import Container from "../../components/container/Container";
import UseToggleDemo from "../../../src/modules/useToggle/useToggleDemo";
import CodeBlock from "../../components/codeBlock/CodeBlock";
const UseToggleCode = `const [isOn, toggle] = useToggle(false);

return (
  <div>
    <p>Toggle state: {isOn ? "ON" : "OFF"}</p>
    <button onClick={toggle}>Toggle</button>
  </div>
);`;

const UseTogglePage = () => {
  return (
    <section id="useToggle" className="section useToggle-section">
      <h2 className="section-heading">UseToggle hook</h2>
      <Container
        title="useToggle"
        desc="Simple toggle component using useToggle hook"
        content={<UseToggleDemo />}
        codeContent={<CodeBlock code={UseToggleCode} />}
      />
    </section>
  );
};

export default UseTogglePage;

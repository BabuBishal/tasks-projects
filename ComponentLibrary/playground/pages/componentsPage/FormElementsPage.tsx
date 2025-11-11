import Checkbox from "../../../src/components/form/Checkbox/Checkbox";
import Select from "../../../src/components/form/Select/Select";
import Textarea from "../../../src/components/form/Textarea/Textarea";
import Input from "../../../src/components/form/TextInput/Input";
import Toggle from "../../../src/components/toggle/Toggle";
import CodeBlock from "../../components/codeBlock/CodeBlock";
import Container from "../../components/container/Container";

const TextInputCode = `<Input 
  label="Email" 
  placeholder="Enter email ..." 
  type="email" 
/>
<Input 
  label="Password" 
  placeholder="Enter password ..." 
  type="password" 
/>`;

const TextAreaCode = `<Textarea 
  label="Message" 
  placeholder="Enter your message..." 
/>`;

const CheckboxCode = `<Checkbox label="Accept terms and conditions" />
<Checkbox label="Subscribe to the newsletter" />`;

const SelectCode = `<Select label="Framework" 
  optionList={["React", "Vue", "Angular"]} 
/>`;
const ToggleCode = `<Toggle label="Enable Notifications" />
<Toggle checkedText="☀️" uncheckedText="🌙" />`;

const FormElementsPage = () => {
  return (
    <section id="form-elements" className="section form-section">
      <h2 className="section-heading">Form Elements</h2>
      <h4 className="section-desc">
        Input fields, selects, and other form controls
      </h4>
      <Container
        title="Text Inputs"
        desc="Standard text input fields"
        content={
          <>
            <Input label="Email" placeholder="Enter email ..." type="email" />
            <Input
              label="Password"
              placeholder="Enter password ..."
              type="password"
            />
          </>
        }
        codeContent={<CodeBlock code={TextInputCode} />}
      />
      <Container
        title="Text Area"
        desc="Multi-line text inputs"
        content={
          <Textarea label="Message" placeholder="Enter your message..." />
        }
        codeContent={<CodeBlock code={TextAreaCode} />}
      />
      <Container
        title="Checkbox"
        desc="Checkbox inputs"
        content={
          <>
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to the newsletter" />
          </>
        }
        codeContent={<CodeBlock code={CheckboxCode} />}
      />
      <Container
        title="Select"
        desc="Dropdown selection"
        content={
          <Select label="Framework" optionList={["React", "Vue", "Angular"]} />
        }
        codeContent={<CodeBlock code={SelectCode} />}
      />
      <Container
        title="Switch"
        desc="Toggle switch"
        content={
          <>
            <Toggle label="Enable Notifications" />
            <Toggle checkedText="☀️" uncheckedText="🌙" />
          </>
        }
        codeContent={<CodeBlock code={ToggleCode} />}
      />
    </section>
  );
};

export default FormElementsPage;

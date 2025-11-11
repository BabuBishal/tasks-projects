import Card from "../../../src/components/Card/Card"
import Checkbox from "../../../src/components/Form/Checkbox/Checkbox"
import Select from "../../../src/components/Form/Select/Select"
import Textarea from "../../../src/components/Form/Textarea/Textarea"
import Input from "../../../src/components/Form/TextInput/Input"
import Toggle from "../../../src/components/Toggle/Toggle"
import Container from "../../components/Container/Container"

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
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Input label="Email" placeholder="Enter email ..." type="email" />
<Input label="Password" placeholder="Enter password ..." type="password" />`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Text Area"
          desc="Multi-line text inputs"
          content={
            <Textarea label="Message" placeholder="Enter your message..." />
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Textarea label="Message" placeholder="Enter your message..." />`}</code>
                </pre>
              }
            />
          }
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
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Checkbox label="Accept terms and conditions" />
<Checkbox label="Subscribe to the newsletter" />`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Select"
          desc="Dropdown selection"
          content={
            <Select
              label="Framework"
              optionList={["React", "Vue", "Angular"]}
            />
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Select label="Framework" optionList={["React", "Vue", "Angular"]} />`}</code>
                </pre>
              }
            />
          }
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
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Toggle label="Enable Notifications" />
<Toggle checkedText="☀️" uncheckedText="🌙" />`}</code>
                </pre>
              }
            />
          }
        />
      </section>
  )
}

export default FormElementsPage
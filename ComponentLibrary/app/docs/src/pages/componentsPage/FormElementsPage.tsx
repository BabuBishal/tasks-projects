import Checkbox from "../../../../../packages/ui/src/components/form/Checkbox/Checkbox";
import Select from "../../../../../packages/ui/src/components/form/Select/Select";
import Textarea from "../../../../../packages/ui/src/components/form/Textarea/Textarea";
import Input from "../../../../../packages/ui/src/components/form/TextInput/Input";
import Toggle from "../../../../../packages/ui/src/components/toggle/Toggle";
import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";
import Container from "../../shared/templates/container/Container";
import Slider from "../../../../../packages/ui/src/components/slider/Slider";

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
      <Container title="Text Inputs" desc="Standard text input fields">
        <Container.content>
          <Input label="Email" placeholder="Enter email ..." type="email" />
          <Input
            label="Password"
            placeholder="Enter password ..."
            type="password"
          />
        </Container.content>
        <Container.code>
          <CodeBlock code={TextInputCode} />
        </Container.code>
      </Container>
      <Container title="Text Area" desc="Multi-line text inputs">
        <Container.content>
          <Textarea label="Message" placeholder="Enter your message..." />
        </Container.content>
        <Container.code>
          <CodeBlock code={TextAreaCode} />
        </Container.code>
      </Container>
      <Container title="Checkbox" desc="Checkbox inputs">
        <Container.content>
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Subscribe to the newsletter" />
        </Container.content>
        <Container.code>
          <CodeBlock code={CheckboxCode} />
        </Container.code>
      </Container>
      <Container title="Select" desc="Dropdown selection">
        <Container.content>
          <Select label="Framework" optionList={["React", "Vue", "Angular"]} />
        </Container.content>
        <Container.code>
          <CodeBlock code={SelectCode} />
        </Container.code>
      </Container>
      <Container title="Switch" desc="Toggle switch">
        <Container.content>
          <Toggle label="Enable Notifications" />
          <Toggle checkedText="☀️" uncheckedText="🌙" />
        </Container.content>
        <Container.code>
          <CodeBlock code={ToggleCode} />
        </Container.code>
      </Container>
      <Container
        title="Slider"
        desc="A slider component for selecting values within a range"
      >
        <Container.content>
          <Slider id="volume-slider">
            <Slider.Label htmlFor="volume-slider">Volume</Slider.Label>
            <Slider.Field
              type="range"
              min={0}
              max={100}
              step={5}
              value={50}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value);
              }}
            />
          </Slider>
        </Container.content>
        <Container.code>
          <CodeBlock code={`<Slider />`} />
        </Container.code>
      </Container>
    </section>
  );
};

export default FormElementsPage;

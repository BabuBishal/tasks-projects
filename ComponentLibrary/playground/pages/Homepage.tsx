import { Button } from "../../src/components/Button/Button";
import Card from "../../src/components/Card/Card";
import Checkbox from "../../src/components/Form /Checkbox";
import Input from "../../src/components/Form /Input";
import Select from "../../src/components/Form /Select";
import Textarea from "../../src/components/Form /Textarea";
import Container from "../components/Container/Container";

const Homepage = () => {
  return (
    <div className="homepage">
      <section id="intro-section" className="section intro-section">
        <h2 className="main-title">UI Component Library</h2>
        <h4 className="main-desc">
          A comprehensive collection of beautiful, accessible, and customizable
          UI components built with React{" "}
        </h4>
      </section>
      <section id="button-section" className="section button-section">
        <h2 className="section-heading">Buttons</h2>
        <h4 className="section-desc">
          Various button styles and sizes for different use cases
        </h4>
        <Container
          title="Button Variants"
          desc="Different visual styles"
          content={
            <>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="danger">Danger</Button>
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Button Sizes"
          desc="Different size options"
          content={
            <>
              <Button size="lg">Large</Button>
              <Button size="md">Medium</Button>
              <Button size="sm">Small</Button>
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Button size="lg">Large</Button>
<Button size="md">Medium</Button>
<Button size="sm">Small</Button>`}</code>
                </pre>
              }
            />
          }
        />
      </section>

      <section id="form-section" className="section form-section">
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
      </section>
    </div>
  );
};

export default Homepage;

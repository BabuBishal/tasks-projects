import { Button } from "../../src/components/Button/Button";
import Card from "../../src/components/Card/Card";
import Input from "../../src/components/Form /Input";
import Textarea from "../../src/components/Form /Textarea";
import Container from "../components/Container/Container";

const Homepage = () => {
  return (
    <div className="homepage">
      <section className="section intro-section">
        <h2 className="main-title">UI Component Library</h2>
        <h4 className="main-desc">
          A comprehensive collection of beautiful, accessible, and customizable
          UI components built with React{" "}
        </h4>
      </section>
      <section className="section button-section">
        <h2>Buttons</h2>
        <h4>Various button styles and sizes for different use cases</h4>
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
        />
        <Container
          title="Button Sizes"
          desc="Different size options"
          content={
            <>
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </>
          }
        />
      </section>

      <section className="section button-section">
        <h2>Form Elements</h2>
        <h4>Input fields, selects, and other form controls</h4>
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
        />
        <Container
          title="Text Area"
          desc="Multi-line text inputs"
          content={
            <Textarea label="Message" placeholder="Enter your message..." />
          }
        />
      </section>
    </div>
  );
};

export default Homepage;

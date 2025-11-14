import { Button } from "../../../../../packages/ui/src/components/button/Button";
import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";
import Container from "../../shared/templates/container/Container";
const ButtonSizeCode = `<Button variant="primary" size="lg">Large</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="sm">Small</Button>`;

const ButtonVariantCode = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>`;

const ButtonCustomCode = `<Button className="custom-style1">Custom</Button>
<Button className="custom-style2">Custom</Button>`;

const ButtonStatesCode = `<Button variant="primary" disabled>Large</Button>`;

const ButtonPage = () => {
  return (
    <section id="buttons" className="section button-section">
      <h2 className="section-heading">Buttons</h2>
      <h4 className="section-desc">
        Various button styles and sizes for different use cases
      </h4>
      <Container title="Button Variants" desc="Different visual styles">
        <Container.content>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
        </Container.content>
        <Container.code>
          <CodeBlock code={ButtonVariantCode} />
        </Container.code>
      </Container>
      <Container title="Button Sizes" desc="Different size options">
        <Container.content>
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
        </Container.content>
        <Container.code>
          <CodeBlock code={ButtonSizeCode} />
        </Container.code>
      </Container>
      <Container title="Button states" desc="Different button states">
        <Container.content>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </Container.content>
        <Container.code>
          <CodeBlock code={ButtonStatesCode} />
        </Container.code>
      </Container>
      <Container title="Custom Button Class" desc="Custom button styling">
        <Container.content>
          <Button className="custom-style1">Custom 1</Button>
          <Button className="custom-style2">Custom 2</Button>
        </Container.content>
        <Container.code>
          <CodeBlock code={ButtonCustomCode} />
        </Container.code>
      </Container>
    </section>
  );
};

export default ButtonPage;

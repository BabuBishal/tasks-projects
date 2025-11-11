import { Button } from "../../../src/components/Button/Button"
import Card from "../../../src/components/Card/Card"
import Container from "../../components/Container/Container"

const ButtonPage = () => {
  return (
    <section id="buttons" className="section button-section">
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
              <Button variant="primary" size="lg">
                Large
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="sm">
                Small
              </Button>
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Button variant="primary" size="lg">Large</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="sm">Small</Button>`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Button states"
          desc="Different button states"
          content={
            <>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Button variant="primary" disabled>Large</Button>`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Custom Button Class"
          desc="Custom button styling"
          content={
            <>
              <Button className="custom-style1">Custom 1</Button>
              <Button className="custom-style2">Custom 2</Button>
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Button className="custom-style1">Custom</Button>
<Button className="custom-style2">Custom</Button>`}</code>
                </pre>
              }
            />
          }
        />
      </section>
  )
}

export default ButtonPage
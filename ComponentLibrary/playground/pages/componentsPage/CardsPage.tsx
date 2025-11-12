import Card from "../../../src/components/card/Card";
import CodeBlock from "../../components/codeBlock/CodeBlock";
import Container from "../../components/container/Container";

const CardCode = `<Card title="Card Title" content="This is a simple card." />`;

const CardsPage = () => {
  return (
    <section id="cards" className="section card-section">
      <h2 className="section-heading">Cards</h2>
      <h4 className="section-desc">Card elements for displaying content</h4>
      <Container title="Card" desc="Simple card component">
        <Container.content>
          <Card title="Card Title" content="This is a simple card." />
        </Container.content>
        <Container.code>
          <CodeBlock code={CardCode} />
        </Container.code>
      </Container>
    </section>
  );
};

export default CardsPage;

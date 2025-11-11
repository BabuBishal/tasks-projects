import Card from "../../../src/components/Card/Card";
import Container from "../../components/Container/Container";

const CardsPage = () => {
  return (
    <section id="cards" className="section card-section">
      <h2 className="section-heading">Cards</h2>
      <h4 className="section-desc">Card elements for displaying content</h4>
      <Container
        title="Card"
        desc="Simple card component"
        content={
          <>
            <Card title="Card Title" content="This is a simple card." />
          </>
        }
        codeContent={
          <Card
            title="Code Example"
            content={
              <pre>
                <code>{`<Card title="Card Title" content="This is a simple card." />`}</code>
              </pre>
            }
          />
        }
      />
    </section>
  );
};

export default CardsPage;

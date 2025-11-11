import Card from "../../../src/components/Card/Card";
import Container from "../../components/Container/Container";
import Badge from "../../../src/components/Badges/Badges";

const BadgePage = () => {
  return (
    <section id="badges" className="section badge-section">
      <h2 className="section-heading">Badges</h2>
      <h4 className="section-desc">
        Various badges styles and sizes for different use cases
      </h4>
      <Container
        title="Badges Variants"
        desc="Different visual styles"
        content={
          <>
            <Badge text="Success" variant="success" />
            <Badge variant="warning" text="Warning" />
            <Badge variant="info" text="Info" />
            <Badge variant="danger" text="Danger" />
          </>
        }
        codeContent={
          <Card
            title="Code Example"
            content={
              <pre>
                <code>{`<Badge text="Success" variant="success" />
<Badge variant="warning" text="Warning" />
<Badge variant="info" text="Info" />
<Badge variant="danger" text="Danger" />`}</code>
              </pre>
            }
          />
        }
      />
      <Container
        title="Badge Sizes"
        desc="Different size options"
        content={
          <>
            <Badge text="Large" size="large" variant="success" />
            <Badge text="Medium" size="medium" variant="success" />
            <Badge text="Small" size="small" variant="success" />
          </>
        }
        codeContent={
          <Card
            title="Code Example"
            content={
              <pre>
                <code>{`<Badge text="Large" size="large" variant="success" />
<Badge text="Medium" size="medium" variant="success" />
<Badge text="Small" size="small" variant="success" />`}</code>
              </pre>
            }
          />
        }
      />

      <Container
        title="Custom Badge "
        desc="Custom badge styling"
        content={
          <>
            <Badge text="Custom 1" className="custom1" />
            <Badge text="Custom 2" className="custom2" />
          </>
        }
        codeContent={
          <Card
            title="Code Example"
            content={
              <pre>
                <code>{`<Badge text="Custom 1" className="custom1" />
<Badge text="Custom 2" className="custom2" />`}</code>
              </pre>
            }
          />
        }
      />
    </section>
  );
};

export default BadgePage;

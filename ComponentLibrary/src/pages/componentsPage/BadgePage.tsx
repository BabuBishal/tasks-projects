import Container from "../../shared/templates/container/Container";
import Badge from "../../shared/ui/badges/Badges";
import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";

const BadgeVariantCode = `<Badge text="Success" variant="success" />
<Badge variant="warning" text="Warning" />
<Badge variant="info" text="Info" />
<Badge variant="danger" text="Danger" />`;

const BadgeSizeCode = `<Badge text="Large" size="large" variant="success" />
<Badge text="Medium" size="medium" variant="success" />
<Badge text="Small" size="small" variant="success" />`;

const BadgeCustomCode = `<Badge unstyled text="Custom 1" className="custom1" />
<Badge unstyled text="Custom 2" className="custom2" />`;

const BadgePage = () => {
  return (
    <section id="badges" className="section badge-section">
      <h2 className="section-heading">Badges</h2>
      <h4 className="section-desc">
        Various badges styles and sizes for different use cases
      </h4>
      <Container title="Badges Variants" desc="Different visual styles">
        <Container.content>
          <Badge text="Success" variant="success" />
          <Badge variant="warning" text="Warning" />
          <Badge variant="info" text="Info" />
          <Badge variant="danger" text="Danger" />
        </Container.content>
        <Container.code>
          <CodeBlock code={BadgeVariantCode} />
        </Container.code>
      </Container>

      <Container title="Badge Sizes" desc="Different size options">
        <Container.content>
          <Badge text="Large" size="large" variant="success" />
          <Badge text="Medium" size="medium" variant="success" />
          <Badge text="Small" size="small" variant="success" />
        </Container.content>
        <Container.code>
          <CodeBlock code={BadgeSizeCode} />
        </Container.code>
      </Container>

      <Container title="Custom Badge " desc="Custom badge styling">
        <Container.content>
          <>
            <Badge unstyled text="Custom 1" className="custom1" />
            <Badge unstyled text="Custom 2" className="custom2" />
          </>
        </Container.content>
        <Container.code>
          <CodeBlock code={BadgeCustomCode} />
        </Container.code>
      </Container>
    </section>
  );
};

export default BadgePage;

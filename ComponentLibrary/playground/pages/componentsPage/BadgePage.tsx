import Container from "../../components/container/Container";
import Badge from "../../../src/components/badges/Badges";
import CodeBlock from "../../components/codeBlock/CodeBlock";

const BadgeVariantCode = `<Badge text="Success" variant="success" />
<Badge variant="warning" text="Warning" />
<Badge variant="info" text="Info" />
<Badge variant="danger" text="Danger" />`;

const BadgeSizeCode = `<Badge text="Large" size="large" variant="success" />
<Badge text="Medium" size="medium" variant="success" />
<Badge text="Small" size="small" variant="success" />`;

const BadgeCustomCode = `<Badge text="Custom 1" className="custom1" />
<Badge text="Custom 2" className="custom2" />`;

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
        codeContent={<CodeBlock code={BadgeVariantCode} />}
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
        codeContent={<CodeBlock code={BadgeSizeCode} />}
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
        codeContent={<CodeBlock code={BadgeCustomCode} />}
      />
    </section>
  );
};

export default BadgePage;

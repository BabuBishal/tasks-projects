import LoadingDots from "../../../src/components/loading/LoadingDots/LoadingDots";
import Spinner from "../../../src/components/loading/Spinner/Spinner";
import CodeBlock from "../../components/codeBlock/CodeBlock";
import Container from "../../components/container/Container";
const SpinnerCode = `<Spinner />`;
const LoadingDotsCode = `<LoadingDots />`;

const LoadersPage = () => {
  return (
    <section id="loading" className="section loading-section">
      <h2 className="section-heading">Loading Elements</h2>
      <h4 className="section-desc">Loading elements for loading states</h4>
      <Container
        title="Loading Dots"
        desc="Animated loading dots for loading state"
        content={<LoadingDots />}
        codeContent={<CodeBlock code={LoadingDotsCode} />}
      />
      <Container
        title="Spinner"
        desc="Animated spinner for loading state"
        content={<Spinner />}
        codeContent={<CodeBlock code={SpinnerCode} />}
      />
    </section>
  );
};

export default LoadersPage;

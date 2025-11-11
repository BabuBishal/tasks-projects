import Card from "../../../src/components/Card/Card"
import LoadingDots from "../../../src/components/Loading/LoadingDots/LoadingDots"
import Spinner from "../../../src/components/Loading/Spinner/Spinner"
import Container from "../../components/Container/Container"

const LoadersPage = () => {
  return (
     <section id="loading" className="section loading-section">
        <h2 className="section-heading">Loading Elements</h2>
        <h4 className="section-desc">Loading elements for loading states</h4>
        <Container
          title="Loading Dots"
          desc="Animated loading dots for loading state"
          content={<LoadingDots />}
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<LoadingDots />`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Spinner"
          desc="Animated spinner for loading state"
          content={<Spinner />}
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Spinner />`}</code>
                </pre>
              }
            />
          }
        />
      </section>
  )
}

export default LoadersPage
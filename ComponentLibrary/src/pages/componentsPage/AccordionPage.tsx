import Accordion from "../../shared/ui/accordion/Accordion";
import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";
import Container from "../../shared/templates/container/Container";

const AccordionCode = `<Accordion defaultOpen="item1">
  <Accordion.Item value="item1">
    <Accordion.Header>What is your return policy?</Accordion.Header>
    <Accordion.Content>
      You can return any item within 30 days of purchase if it's
      unused and in its original packaging.
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item2">
    <Accordion.Header>
      Do you offer international shipping?
    </Accordion.Header>
    <Accordion.Content>
      Yes, we ship worldwide! Shipping costs will vary depending on
      your location and will be calculated at checkout.
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item3">
    <Accordion.Header>How can I track my order?</Accordion.Header>
    <Accordion.Content>
      Once your order has been shipped, you’ll receive an email with
      a tracking number and link.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`;

const AccordionPage = () => {
  return (
    <section id="accordion" className="section accordion-section">
      <h2 className="section-heading">Accordion</h2>
      <h4 className="section-desc">
        Accordion component for displaying information
      </h4>
      <Container
        title="Accordion"
        desc="Displays information in collapsible sections. Click a header
        to expand or collapse its content."
      >
        <Container.content>
          <Accordion defaultOpen="item1">
            <Accordion.Item value="item1">
              <Accordion.Header>What is your return policy?</Accordion.Header>
              <Accordion.Content>
                You can return any item within 30 days of purchase if it's
                unused and in its original packaging.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="item2">
              <Accordion.Header>
                Do you offer international shipping?
              </Accordion.Header>
              <Accordion.Content>
                Yes, we ship worldwide! Shipping costs will vary depending on
                your location and will be calculated at checkout.
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item value="item3">
              <Accordion.Header>How can I track my order?</Accordion.Header>
              <Accordion.Content>
                Once your order has been shipped, you’ll receive an email with a
                tracking number and link.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Container.content>
        <Container.code>
          <CodeBlock code={AccordionCode} />
        </Container.code>
      </Container>
    </section>
  );
};

export default AccordionPage;

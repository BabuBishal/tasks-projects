import Card from "../../../src/components/Card/Card";
import Tabs from "../../../src/components/Tab/Tabs";
import Container from "../../components/Container/Container";

const TabsPage = () => {
  return (
    <section id="tabs" className="section tab-section">
      <h2 className="section-heading">Tabs</h2>
      <h4 className="section-desc">
        Tab component for displaying different tab contents
      </h4>
      <Container
        title="Tab components"
        desc="Tab components for different tab contents"
        content={
          <Tabs defaultValue="Recommended">
            <Tabs.List>
              <Tabs.Trigger value="Recommended">Recommended</Tabs.Trigger>
              <Tabs.Trigger value="Popular">Popular</Tabs.Trigger>
              <Tabs.Trigger value="New">New</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="Recommended">
              <p>This is the Recommended tab content.</p>
            </Tabs.Content>
            <Tabs.Content value="Popular">
              <p>This is the Popular tab content.</p>
            </Tabs.Content>
            <Tabs.Content value="New">
              <p>This is the New tab content.</p>
            </Tabs.Content>
          </Tabs>
        }
        codeContent={
          <Card
            title="Code Example"
            content={
              <pre>
                <code>{` <Tabs defaultValue="Recommended">
  <Tabs.List>
    <Tabs.Trigger value="Recommended">Recommended</Tabs.Trigger>
    <Tabs.Trigger value="Popular">Popular</Tabs.Trigger>
    <Tabs.Trigger value="New">New</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="Recommended">
    <p>This is the Recommended tab content.</p>
  </Tabs.Content>
  <Tabs.Content value="Popular">
    <p>This is the Popular tab content.</p>
  </Tabs.Content>
  <Tabs.Content value="New">
    <p>This is the New tab content.</p>
  </Tabs.Content>
</Tabs>`}</code>
              </pre>
            }
          />
        }
      />
    </section>
  );
};

export default TabsPage;

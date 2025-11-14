import Tabs from "../../shared/ui/tab/Tabs";
import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";

import Container from "../../shared/templates/container/Container";
const TabsCode = `<Tabs defaultValue="Recommended">
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
</Tabs>`;

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
        // content={<Content />}
        // codeContent={<CodeBlock code={TabsCode} />}
      >
        <Container.content>
          <Content />
        </Container.content>
        <Container.code>
          <CodeBlock code={TabsCode} />
        </Container.code>
      </Container>
    </section>
  );
};

const Content = () => (
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
);

export default TabsPage;

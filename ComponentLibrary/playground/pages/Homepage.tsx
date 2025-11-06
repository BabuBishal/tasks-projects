import Accordion from "../../src/components/Accordion/Accordion";
import Badge from "../../src/components/Badges/Badges";
import { Button } from "../../src/components/Button/Button";
import Card from "../../src/components/Card/Card";
import Checkbox from "../../src/components/Form/Checkbox/Checkbox";
import Select from "../../src/components/Form/Select/Select";
import Textarea from "../../src/components/Form/Textarea/Textarea";
import Input from "../../src/components/Form/TextInput/Input";
import LoadingDots from "../../src/components/Loading/LoadingDots/LoadingDots";
import Spinner from "../../src/components/Loading/Spinner/Spinner";
import Tabs from "../../src/components/Tab/Tabs";
import Table from "../../src/components/Table/Table";
import Toggle from "../../src/components/Toggle/Toggle";
import Container from "../components/Container/Container";
import CodeBlock from "../components/CodeBlock/CodeBlock";
import UseToggleDemo from "../../src/modules/useToggle/useToggleDemo";
import UseFetchDemo from "../../src/modules/useFetch/useFetchDemo";
import UseCopyToClipboardDemo from "../../src/modules/useCopyToClipBoard/useCopyToClipboardDemo";
import { column, row } from "../../src/utils/constants";

const Homepage = () => {
  return (
    <div className="homepage">
      <section id="introduction" className="section intro-section">
        <h2 className="main-title">UI Component Library</h2>
        <h4 className="main-desc">
          A comprehensive collection of beautiful, accessible, and customizable
          UI components built with React{" "}
        </h4>
      </section>
      <section id="installation" className="section installation-section">
        <h2 className="section-heading">Installation</h2>
        <h4 className="section-desc">
          A guide to install and use the components from this UI library
        </h4>
        <Container
          title="Installation guide"
          desc="Step by step guide to use the different components of the UI library"
          content={
            "This feature is not complete yet. Please wait for future updates..."
          }
        />
      </section>
      <section id="buttons" className="section button-section">
        <h2 className="section-heading">Buttons</h2>
        <h4 className="section-desc">
          Various button styles and sizes for different use cases
        </h4>
        <Container
          title="Button Variants"
          desc="Different visual styles"
          content={
            <>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="danger">Danger</Button>
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Button Sizes"
          desc="Different size options"
          content={
            <>
              <Button variant="primary" size="lg">
                Large
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="sm">
                Small
              </Button>
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Button variant="primary" size="lg">Large</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="sm">Small</Button>`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Button states"
          desc="Different button states"
          content={
            <>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Button variant="primary" disabled>Large</Button>`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Custom Button Class"
          desc="Custom button styling"
          content={
            <>
              <Button className="custom-style1">Custom 1</Button>
              <Button className="custom-style2">Custom 2</Button>
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Button className="custom-style1">Custom</Button>
<Button className="custom-style2">Custom</Button>`}</code>
                </pre>
              }
            />
          }
        />
      </section>

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

      <section id="form-elements" className="section form-section">
        <h2 className="section-heading">Form Elements</h2>
        <h4 className="section-desc">
          Input fields, selects, and other form controls
        </h4>
        <Container
          title="Text Inputs"
          desc="Standard text input fields"
          content={
            <>
              <Input label="Email" placeholder="Enter email ..." type="email" />
              <Input
                label="Password"
                placeholder="Enter password ..."
                type="password"
              />
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Input label="Email" placeholder="Enter email ..." type="email" />
<Input label="Password" placeholder="Enter password ..." type="password" />`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Text Area"
          desc="Multi-line text inputs"
          content={
            <Textarea label="Message" placeholder="Enter your message..." />
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Textarea label="Message" placeholder="Enter your message..." />`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Checkbox"
          desc="Checkbox inputs"
          content={
            <>
              <Checkbox label="Accept terms and conditions" />
              <Checkbox label="Subscribe to the newsletter" />
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Checkbox label="Accept terms and conditions" />
<Checkbox label="Subscribe to the newsletter" />`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Select"
          desc="Dropdown selection"
          content={
            <Select
              label="Framework"
              optionList={["React", "Vue", "Angular"]}
            />
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Select label="Framework" optionList={["React", "Vue", "Angular"]} />`}</code>
                </pre>
              }
            />
          }
        />
        <Container
          title="Switch"
          desc="Toggle switch"
          content={
            <>
              <Toggle label="Enable Notifications" />
              <Toggle checkedText="☀️" uncheckedText="🌙" />
            </>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Toggle label="Enable Notifications" />
<Toggle checkedText="☀️" uncheckedText="🌙" />`}</code>
                </pre>
              }
            />
          }
        />
      </section>

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

      <section id="tables" className="section table-section">
        <h2 className="section-heading">Tables</h2>
        <h4 className="section-desc">Table element for displaying content</h4>

        <Container
          title="Table"
          desc="Table component for displaying data"
          content={
            <Table>
              <Table.Header>
                {column.map((col, i) => (
                  <Table.HeaderCell key={i}>{col}</Table.HeaderCell>
                ))}
              </Table.Header>
              <Table.Body>
                {row.map((row, rowIndex) => (
                  <Table.Row key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <Table.Cell key={cellIndex}>{cell}</Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{` <Table>
  <Table.Header>
    {column.map((col, i) => (
      <Table.HeaderCell key={i}>{col}</Table.HeaderCell>
    ))}
  </Table.Header>
  <Table.Body>
    {row.map((row, rowIndex) => (
      <Table.Row key={rowIndex}>
        {row.map((cell, cellIndex) => (
          <Table.Cell key={cellIndex}>{cell}</Table.Cell>
        ))}
      </Table.Row>
    ))}
  </Table.Body>
</Table>`}</code>
                </pre>
              }
            />
          }
        />
      </section>

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

      <section id="accordion" className="section accordion-section">
        <h2 className="section-heading">Accordion</h2>
        <h4 className="section-desc">
          Accordion component for displaying information
        </h4>
        <Container
          title="Accordion"
          desc="Displays information in collapsible sections. Click a header
        to expand or collapse its content."
          content={
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
                  Once your order has been shipped, you’ll receive an email with
                  a tracking number and link.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          }
          codeContent={
            <Card
              title="Code Example"
              content={
                <pre>
                  <code>{`<Accordion defaultOpen="item1">
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
</Accordion>`}</code>
                </pre>
              }
            />
          }
        />
      </section>

      <section className="section hooks-section">
        <h1 className="section-heading">Custom Hooks</h1>
        <h4 className="section-desc">Common Reusable custom hooks</h4>
      </section>
      <section id="useToggle" className="section useToggle-section">
        <h2 className="section-heading">UseToggle hook</h2>
        <Container
          title="useToggle"
          desc="Simple toggle component using useToggle hook"
          content={<UseToggleDemo />}
          codeContent={
            <CodeBlock
              code={`const [isOn, toggle] = useToggle(false);

return (
  <div>
    <p>Toggle state: {isOn ? "ON" : "OFF"}</p>
    <button onClick={toggle}>Toggle</button>
  </div>
);`}
            />
          }
        />
      </section>
      <section
        id="useCopyToClipboard"
        className="section copyToClipboard-section"
      >
        <h2 className="section-heading">UseCopyToClipboard hook</h2>
        <Container
          title="useCopyToClipboard"
          desc="Hook to copy text to clipboard"
          content={<UseCopyToClipboardDemo />}
          codeContent={
            <CodeBlock
              code={` const [text, setText] = useState("Copy this text!");
  const { copiedText, copy } = useCopyToClipboard();

  return (
    <div className={styles.container}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.input}
      />

      <Button variant="primary" onClick={() => copy(text)}>
        {copiedText === text ? "Copied!" : "Copy"}
      </Button>
    </div>
  );`}
            />
          }
        />
      </section>
      <section id="useFetch" className="section useFetch-section">
        <h2 className="section-heading">UseFetch hook</h2>
        <Container
          title="useFetch"
          desc="Custom hook for fetching data from an API"
          content={<UseFetchDemo />}
          codeContent={
            <CodeBlock
              code={`  const { data, loading, error } = useFetch<any>("https://jsonplaceholder.typicode.com/posts/1");

  return (
    <div className={styles.hookDemo}>
      <h3 className={styles.title}>useFetch Demo</h3>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error.message}</p>}
      {data && (
        <div className={styles.dataContainer}>
          <h4>{data.title}</h4>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );`}
            />
          }
        />
      </section>
    </div>
  );
};

export default Homepage;

import HelloWorld from "../components/HelloWorld";
import Tab from "../components/Tab/Tab";
import TabContent from "../components/Tab/TabContent";
import Tabs from "../components/Tab/Tabs";
import "../styles/pages/TabsPage.css";

const TabsPage = () => {
  return (
    <div className="tabs-page">
      <HelloWorld title="Task 9: Tabs" description="" />
      <Tabs>
        <Tab label="Tab 1" active>
          <TabContent
            title="This is the content for Tab 1"
            content={"Content for Tab 1"}
          />
        </Tab>
        <Tab label="Tab 2">
          <TabContent
            title="This is the content for Tab 2"
            content="Content for Tab 2"
          />
        </Tab>
        <Tab label="Tab 3">
          <TabContent
            title="This is the content for Tab 3"
            content="Content for Tab 3"
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabsPage;

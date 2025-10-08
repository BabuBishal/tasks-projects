import "../../styles/component/tab.css";
const Tab = ({ children, activeTab, currentTab, setActiveTab }) => {
  if (!children) return null;
  return (
    <div
      className={`tab ${
        activeTab === currentTab
          ? 'active-tab'
          : "inactive-tab"
      }`}
      onClick={() =>
        setActiveTab && currentTab !== undefined && setActiveTab(currentTab)
      }
    >
      {children}
    </div>
  );
};

export default Tab;

import "../../styles/component/tab.css";
const Tab = ({ children, activeTab, currentTab, setActiveTab }) => {
  if (!children) return null;
  const isActive = activeTab === currentTab;
  return (
    <div
      className={`tab ${isActive ? "active-tab" : "inactive-tab"}`}
      onClick={() => setActiveTab(currentTab)}
    >
      {children}
    </div>
  );
};

export default Tab;

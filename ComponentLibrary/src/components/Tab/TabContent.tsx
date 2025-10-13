import "../../styles/component/tabContent.css";
const TabContent = ({ title, content }) => {
  return (
    <div className="tab-content">
      <h4>{content}</h4>
      <p>{title}</p>
    </div>
  );
};

export default TabContent;

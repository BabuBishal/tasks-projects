import "../styles/component/buttons.css";

const ReusableButton = ({
  buttonText = "Button",
  variant = "",
  onClick = () => {},
}) => {
  return (
    <button className={` button ${variant}`} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default ReusableButton;

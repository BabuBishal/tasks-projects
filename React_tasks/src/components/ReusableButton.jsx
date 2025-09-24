import "../styles/component/buttons.css";
import PropTypes from "prop-types";

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

ReusableButton.propTypes = {
  buttonText: PropTypes.string,
  variant: PropTypes.oneOf(["", "primary", "secondary", "danger"]),
  onClick: PropTypes.func,
};

export default ReusableButton;

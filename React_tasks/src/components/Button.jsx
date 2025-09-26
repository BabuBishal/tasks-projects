import "../styles/component/buttons.css";
import PropTypes from "prop-types";

const Button = ({
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

Button.propTypes = {
  buttonText: PropTypes.string,
  variant: PropTypes.oneOf(["", "primary", "small", "secondary", "danger"]),
  onClick: PropTypes.func,
};

export default Button;

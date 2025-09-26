import "../../styles/component/input.css";
import PropTypes from "prop-types";

const Input = ({ type, label, placeholder = "Placeholder" }) => {
  return (
    <div className="input-container">
      {label && (
        <label className="label" htmlFor={label}>
          {label}
        </label>
      )}
      <div className="input-field">
        {" "}
        <input
          id={label}
          className="input"
          type={type || "text"}
          placeholder={`${placeholder}`}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;

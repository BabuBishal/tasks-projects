import "../styles/component/input.css";
import PropTypes from "prop-types";

const ReusableInput = ({ label, placeholder = "Placeholder" }) => {
  return (
    <>
      {label && (
        <label className="label" htmlFor={`${label}`}>
          {label}
        </label>
      )}
      <input className="input" type="text" placeholder={`${placeholder}`} />
    </>
  );
};

ReusableInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default ReusableInput;

import "../styles/component/input.css";

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

export default ReusableInput;

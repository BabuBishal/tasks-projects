import React from "react";
import "../../styles/component/input.css";

const PasswordInput = ({ label, placeholder }) => {
  const [eye, setEye] = React.useState(false);
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
          type={eye ? "text" : "password"}
          placeholder={`${placeholder}`}
        />
        {
          <>
            <div className="eye" onClick={() => setEye(!eye)}>
              {eye ? "👁️" : "🙈"}
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default PasswordInput;

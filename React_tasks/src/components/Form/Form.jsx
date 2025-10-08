import "../../styles/component/Form.css";
import "../../styles/component/input.css";
import { useState } from "react";
import Button from "../Button";
import useForm from "../../hooks/useForm";
import { validateForm } from "../../@utils/validator";

const Form = () => {
  const [eye, setEye] = useState(false);
  const [toast, setToast] = useState("");

  const { formData, formErrors, handleChange, handleSubmit } = useForm({
    initialValues: {
      username: "",
      password: "",
      email: "",
      dob: "",
      phone: "",
      gender: "",
    },
    validateForm,
  });

  const onSubmit = (data) => {
    setToast("Form submitted successfully!");
    setTimeout(() => setToast(""), 3000);
    console.log("Form Data Submitted: ", data);
  };

  return (
    <>
      {toast && <div className="toast">{toast}</div>}

      <form className="form" onSubmit={(e) => handleSubmit(e, onSubmit)}>
        <div className="input-container">
          <label className="label" htmlFor="username">
            Username
          </label>
          <div className="input-field">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              id="username"
              className="input"
              type="text"
              placeholder="Username ..."
            />
          </div>
          <div className="error">{formErrors.username}</div>
        </div>

        <div className="input-container">
          <label className="label" htmlFor="password">
            Password
          </label>

          <div className="input-field">
            <input
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              type={eye ? "text" : "password"}
              placeholder="Password ..."
            />
            <div className="eye" onClick={() => setEye(!eye)}>
              {eye ? "👁️" : "🙈"}
            </div>
          </div>
          <div className="error">{formErrors.password}</div>
        </div>

        <div className="input-container">
          <label className="label" htmlFor="email">
            Email
          </label>

          <div className="input-field">
            <input
              name="email"
              id="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email ..."
            />
          </div>
          <div className="error">{formErrors.email}</div>
        </div>

        <div className="input-container">
          <label className="label" htmlFor="dob">
            Date of Birth
          </label>

          <div className="input-field">
            <input
              name="dob"
              id="date"
              className="input"
              value={formData.dob}
              onChange={handleChange}
              type="date"
            />
          </div>
          <div className="error">{formErrors.dob}</div>
        </div>

        <div className="input-container">
          <label className="label" htmlFor="phone">
            Phone No.
          </label>

          <div className="input-field">
            <input
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input"
              type="tel"
              placeholder="Phone No. ..."
            />
          </div>
          <div className="error">{formErrors.phone}</div>
        </div>

        <div className="input-container">
          <label className="label" htmlFor="gender">
            Gender
          </label>

          <div className=" radio">
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
          <div className="error">{formErrors.gender}</div>
        </div>

        <Button buttonText="Submit" variant="secondary" />
      </form>
    </>
  );
};

export default Form;

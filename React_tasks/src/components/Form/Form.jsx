import "../../styles/component/Form.css";
import "../../styles/component/input.css";
import { useState } from "react";
import Button from "../Button";

const Form = () => {
  const [eye, setEye] = useState(false);
  const [toast, setToast] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    email: "",
    dob: "",
    phone: "",
    gender: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    if (!formData.username) {
      errors.username = "Username is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!formData.dob) {
      errors.dob = "Date of birth is required";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormData({
        username: "",
        password: "",
        email: "",
        dob: "",
        phone: "",
        gender: "",
        dob: "",
      });
      setToast("Form submitted successfully!");
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <>
      {toast && <div className="toast">{toast}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="label" htmlFor="username">
            Username
          </label>
          <div className="input-field">
            <input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
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
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
              id="email"
              className="input"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
              id="date"
              className="input"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
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
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
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
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              Male
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              Female
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
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

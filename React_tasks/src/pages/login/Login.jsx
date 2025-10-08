import { useState } from "react";
import useForm from "../../hooks/useForm";
import Button from "../../components/Button";
import "../../styles/pages/Login.css";
import { useNavigate } from "react-router-dom";
import "../../styles/component/Form.css";
import { loginSchema } from "../../@utils/constants";
import { validateForm } from "../../@utils/validator";

const Login = () => {
  const { formData, formErrors, handleChange, handleSubmit } = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validateForm,
    schema: loginSchema,
  });
  const [eye, setEye] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log(data);
    if (data.username === "admin" && data.password === "123456") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/tasks");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <h3>Login</h3>
      <form onSubmit={(e) => handleSubmit(e, handleLogin)} className="form">
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
        <Button buttonText="Submit" variant="secondary" />
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;

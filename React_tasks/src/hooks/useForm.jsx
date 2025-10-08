import React, { useState } from "react";
import { validateForm } from "../@utils/validator";

const useForm = ({ initialValues = {}, validate }) => {
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormData(initialValues);
      setToast("Form submitted successfully!");
      setTimeout(() => setToast(""), 3000);
    }
  };

  return {
    formData,
    formErrors,
    toast,
    handleChange,
    handleSubmit,
    setFormData,
  };
};
export default useForm;

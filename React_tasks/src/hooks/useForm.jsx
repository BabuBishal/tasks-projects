import { useState } from "react";

const useForm = ({ initialValues = {}, validateForm }) => {
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e, onSubmit) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormData(initialValues);
      onSubmit && onSubmit(formData);
    }
  };

  return {
    formData,
    formErrors,
    handleChange,
    handleSubmit,
    setFormData,
  };
};
export default useForm;

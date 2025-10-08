import { useState } from "react";

const useForm = ({ initialValues = {}, validateForm, schema }) => {
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
    const errors = validateForm(formData, schema);
    setFormErrors(errors);
    console.log(formErrors);
    if (Object.keys(errors).length === 0) {
      setFormData(initialValues);
      onSubmit && onSubmit(formData);
      console.log(formData);
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

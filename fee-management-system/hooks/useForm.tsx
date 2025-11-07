import { UseFormProps, UseFormReturn } from "@/lib/@types/types";
import { ChangeEvent, FormEvent, useState } from "react";

const useForm = <T extends Record<string, any>>({
  initialValues,
  validateForm,
  schema,
}: UseFormProps<T>): UseFormReturn<T> => {
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    onSubmit?: (data: T) => void
  ) => {
    e.preventDefault();
    const errors = validateForm(formData, schema);
    setFormErrors(errors);
    console.log(formErrors);
    if (Object.keys(errors).length === 0) {
      onSubmit && onSubmit(formData);
      setFormData(initialValues);
      // console.log(formData);
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

import { validationSchema } from "./constants";

export const validateForm = (values, schema = validationSchema) => {
  const errors = {};

  for (const field in schema) {
    const rules = schema[field];
    const value = values[field];

    if (rules.required && !value) {
      errors[field] = `${field[0].toUpperCase() + field.slice(1)} is required`;
      continue;
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors[field] = rules.message;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors[field] = rules.message;
    }
  }

  return errors;
};

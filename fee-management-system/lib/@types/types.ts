import { LucideIcon } from "lucide-react";
import { ChangeEvent, FormEvent } from "react";

export type StatsProps = React.HTMLAttributes<HTMLDivElement> & {
  stats: {
    title: string;
    value: string;
    desc: string;
    icon: LucideIcon;
    analysis: string;
  };
};

export type FieldValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
};

export type ValidationSchema<T extends Record<string, any>> = {
  [K in keyof T]?: FieldValidationRule;
};

export type ValidationErrors<T extends Record<string, any>> = Partial<
  Record<keyof T, string>
>;

export type UseFormProps<T extends Record<string, any>> = {
  initialValues: T;
  validateForm: (values: T, schema: ValidationSchema<T>) => ValidationErrors<T>;
  schema: ValidationSchema<T>;
};

export type UseFormReturn<T extends Record<string, any>> = {
  formData: T;
  formErrors: ValidationErrors<T>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    onSubmit?: (data: T) => void
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
};

// export type RegisterValues = {
//   name: string;
//   email: string;
//   password: string;
// };
// export type LoginValues = Omit<RegisterValues, "name">;

export type FormInputs = {
  name: string;
  email: string;
  password: string;
};
export type LoginFormInputs = Omit<FormInputs, "name">;

export type LoginFormProps = {
  onSubmit: (data: LoginFormInputs) => void; // function called on submit
  formData: LoginFormInputs; // current form values
  formErrors: Partial<Record<keyof LoginFormInputs, string>>; // form validation errors
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    callback: (data: LoginFormInputs) => void
  ) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type FormProps = {
  onSubmit: (data: FormInputs) => void; // function called on submit
  formData: FormInputs; // current form values
  formErrors: Partial<Record<keyof FormInputs, string>>; // form validation errors
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    callback: (data: FormInputs) => void
  ) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

import { ChangeEvent, FormEvent } from "react";

export type StatsProps = React.HTMLAttributes<HTMLDivElement> & {
  stats: {
    title: string;
    value: string;
    desc: string;
    analysis?: string;
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

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  program: "BBA" | "BBM" | "BIM" | "BSc CSIT";
  year: number;
  semester: number;
  email: string;
  phone: string;
  address: string;
  fees: {
    total: number;
    paid: number;
    balance: number;
    dueDate: string;
    status: "Paid" | "Partial" | "Overdue";
  };
}

export type Payment = {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  method: string;
  status: "Pending" | "Paid" | "Overdue";
};

export type PaymentHistory = {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  program: string;
  amount: number;
  date: string;
  method: string;
  status: "Partial" | "Full";
};

// ============================================
// Component Props Types
// Types for React component props
// ============================================

import { ChangeEvent, FormEvent } from "react";
import {
  StudentFormInputs,
  PaymentFormInputs,
  LoginFormInputs,
  RegisterFormInputs,
} from "./forms";

// Form validation
export type FieldValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
};

export type ValidationSchema<T extends Record<string, unknown>> = {
  [K in keyof T]?: FieldValidationRule;
};

export type ValidationErrors<T extends Record<string, unknown>> = Partial<
  Record<keyof T, string>
>;

// Form hook types
export type UseFormProps<T extends Record<string, unknown>> = {
  initialValues: T;
  validateForm: (values: T, schema: ValidationSchema<T>) => ValidationErrors<T>;
  schema: ValidationSchema<T>;
};

export type UseFormReturn<T extends Record<string, unknown>> = {
  formData: T;
  formErrors: ValidationErrors<T>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    onSubmit: (data: T) => void
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
};

// Form component props
export type StudentFormProps = {
  onSubmit: (data: StudentFormInputs) => void;
  formData: StudentFormInputs;
  formErrors: Partial<Record<keyof StudentFormInputs, string>>;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    callback: (data: StudentFormInputs) => void
  ) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
};

export type PaymentFormProps = {
  formData: PaymentFormInputs;
  formErrors: Partial<Record<keyof PaymentFormInputs, string>>;
  handleSubmit: (e: React.FormEvent | React.MouseEvent) => Promise<void>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

export type LoginFormProps = {
  onSubmit: (data: LoginFormInputs) => void;
  formData: LoginFormInputs;
  formErrors: Partial<Record<keyof LoginFormInputs, string>>;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    callback: (data: LoginFormInputs) => void
  ) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type RegisterFormProps = {
  onSubmit: (data: RegisterFormInputs) => void;
  formData: RegisterFormInputs;
  formErrors: Partial<Record<keyof RegisterFormInputs, string>>;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    callback: (data: RegisterFormInputs) => void
  ) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

// Stats card props
export type StatsCardProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  value: string | number;
  desc: string;
  icon?: React.ReactNode;
  analysis?: string;
};

// Fee list item for payment form
export type FeeListItem = {
  id: string;
  academicYear: string;
  semesterNo: number;
  originalFee: number;
  discount: number;
  payableFee: number;
  paid: number;
  balance: number;
  status: string;
  dueDate: string | null;
};

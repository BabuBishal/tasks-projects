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
  handleChange: (e: ChangeEvent<any>) => void;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    onSubmit: (data: T) => void
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

export interface StudentFormInputs {
  name: string;
  email: string;
  // rollNo: string;
  programId: string;
  semester: number;
  phone: string;
  address: string;
  // year: number;
  scholarshipId?: string;
}

export interface PaymentFormProps {
  formData: PaymentFormInputs;
  formErrors: {
    id: string;
    amount: string;
    method: string;
  };
  handleSubmit: (e: React.FormEvent | React.MouseEvent) => Promise<void>; // ✅ Updated signature
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export interface PaymentFormInputs {
  id: string;
  amount: number;
  method: string;
  selectedFeeIds?: string; // ✅ Add this if not already present
}

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

export type FormProps = {
  onSubmit: (data: FormInputs) => void;
  formData: FormInputs;
  formErrors: Partial<Record<keyof FormInputs, string>>;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    callback: (data: FormInputs) => void
  ) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type AddStudentFormProps = {
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

// export type PaymentFormProps = {
//   onSubmit: (data: PaymentFormInputs) => void;
//   formData: PaymentFormInputs;
//   formErrors: Partial<Record<keyof PaymentFormInputs, string>>;
//   handleSubmit: (
//     e: FormEvent<HTMLFormElement>,
//     callback: (data: PaymentFormInputs) => void
//   ) => void;
//   handleChange: (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => void;
// };

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  program: string;
  year: number;
  semester: number;
  email: string;
  phone: string;
  address: string;
  fees: {
    total: number;
    paid: number;
    balance: number;
    dueDate: string | null;
    status: "Paid" | "Partial" | "Overdue" | "N/A";
    totalOutstandingAll?: number;
  };
  // Detailed per-semester fees
  feesList?: Array<{
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
  }>;
}

export interface StudentDetail {
  id: string;
  name: string;
  rollNo: string;
  program: string;
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
    status: "Paid" | "Partial" | "Overdue" | "N/A";
  };
  paymentHistory: Payment[];
}

export type Payment = {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  method: string;
  receiptNo: string;
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

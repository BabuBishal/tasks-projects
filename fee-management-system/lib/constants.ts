export const loginSchema = {
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
  password: {
    required: true,
    minLength: 4,
    message: "Password must be at least 4 characters",
  },
};

export const registerSchema = {
  name: {
    required: true,
    minLength: 3,
    message: "Name must be at least 3 characters",
  },

  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
  password: {
    required: true,
    minLength: 4,
    message: "Password must be at least 4 characters",
  },
};

export const studentSchema = {
  name: {
    required: true,
    minLength: 3,
    message: "Name must be at least 3 characters",
  },
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
  rollNo: {
    required: true,
  },
  program: {
    required: true,
    message: "Please select a program",
  },
  semester: {
    required: true,
    pattern: /^[1-8]$/,
    message: "Semester must be between 1 and 8",
  },
  phone: {
    required: true,
    pattern: /^[0-9]{10}$/,
    message: "Phone number must be 10 digits",
  },
  address: {
    required: true,
    minLength: 3,
    message: "Address must be at least 3 characters",
  },
};

export const paymentSchema = {
  id: {
    required: true,
    message: "Select a student",
  },
  amount: {
    required: true,
  },
  method: {
    required: true,
  },
};
export const studentHeaders = [
  "Name",
  "Roll No",
  "Program",
  "Semester",
  "Contacts",
  "Due Fee",
  "Status",
  "Actions",
];
export const paymentHeaders = [
  "PaymentID",
  "Student",
  "Program",
  "Amount",
  "Date",
  "Method",
  "Status",
];

export const programList = ["BBA", "BBM", "BIM", "BSc CSIT"];
export const paymentMethod = ["Cash", "Bank Transfer", "Online"];

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
  programId: {
    required: true,
    message: "Please select a program",
  },
  semester: {
    required: false,
  },
  phone: {
    required: false,
  },
  address: {
    required: false,
  },
  scholarshipId: {
    required: false,
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
export const paymentMethod = ["Cash", "Bank", "Online"];

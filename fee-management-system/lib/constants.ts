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

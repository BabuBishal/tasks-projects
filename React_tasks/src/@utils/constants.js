export const ADD_TO_CART = "add_to_cart";
export const REMOVE_FROM_CART = "remove_from_cart";

export const STORE_API_URL = "https://fakestoreapi.com/products";

export const validationSchema = {
  username: {
    required: true,
    minLength: 3,
    message: "Username must be at least 3 characters",
  },
  password: {
    required: true,
    minLength: 6,
    message: "Password must be at least 6 characters",
  },
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
  dob: { required: true },
  phone: {
    required: true,
    pattern: /^\d{10}$/,
    message: "Phone number must be 10 digits",
  },
  gender: { required: true },
};

import { ADD_TO_CART, REMOVE_FROM_CART } from "../@utils/constants";

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload;

      // check if product already exists in cart
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        // increment quantity if exists
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // add new product with quantity 1
        return {
          ...state,
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      }
    }
    case REMOVE_FROM_CART: {
      const id = action.payload.id;
      // console.log("Removing", id, "from", state.cart);
      const updatedCart = state.cart.filter((item) => item.id !== id);

      return {
        ...state,
        cart: updatedCart,
      };
    }

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const initialState = {
  cart: [],
};

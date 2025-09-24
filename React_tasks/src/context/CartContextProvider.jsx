import { useContext, useReducer, createContext } from "react";
import { reducer, initialState } from "../reducer/useReducer";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <CartContext value={{ state, dispatch }}>{children}</CartContext>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

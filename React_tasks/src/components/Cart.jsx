import { useCartContext } from "../context/CartContextProvider";
import OrderItem from "./OrderItem";
import "../styles/component/cart.css";

const Cart = () => {
  const { state, dispatch } = useCartContext();
  return (
    <div className="cart-container">
      <span className="cart-logo">
        🛒
        {!!state.cart.length && (
          <span className="cart-count">{state.cart.length}</span>
        )}
      </span>
      <div className="cart-dropdown">
        {state.cart.length ? (
          state?.cart.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
              onRemove={() => {
                dispatch({
                  type: "remove_from_cart",
                  payload: { id: item.id },
                });
              }}
            />
          ))
        ) : (
          <div className="empty-cart">No items in cart</div>
        )}
      </div>
    </div>
  );
};

export default Cart;

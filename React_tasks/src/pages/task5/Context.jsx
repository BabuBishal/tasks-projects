import Card from "../../components/Card";
import HelloWorld from "../../components/HelloWorld";
import "../../styles/pages/Context.css";
import {
  useCartDispatchContext,
  useCartStateContext,
} from "../../hooks/CartContextProvider";

const cardData = [
  { title: "Hello", subtitle: "Mr. XYZ", price: 100 },
  {
    title: "World",
    subtitle: "Mr. ABC",
    price: 200,
  },
  { title: "Test", subtitle: "Mr. Test", price: 150 },
];

const Context = () => {
  const dispatch = useCartDispatchContext();
  const state = useCartStateContext();
  console.log(state);
  return (
    <>
      <div className="context">
        <HelloWorld title="Task 4: Context Api" description="" />
        <div className="context-body">
          <div className="card-container">
            {cardData.map((card, index) => (
              <Card
                key={`card-${index}`}
                title={card.title}
                subtitle={card.subtitle}
                price={card.price}
                onAddToCart={() =>
                  dispatch({
                    type: "add_to_cart",
                    payload: {
                      id: `${card.title}-${index}`,
                      title: card.title,
                      price: card.price,
                    },
                  })
                }
              />
            ))}
          </div>
          <div className="cart-container">
            <h4 className="cart-title">Cart Items</h4>
            {!!state.cart.length ? (
              state.cart.map((item) => (
                <div key={item.id} className="order-item">
                  <span>Title: {item.title}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>Total: {item.price * item.quantity}</span>
                </div>
              ))
            ) : (
              <div>No items in cart</div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="modal-backdrop"></div> */}
    </>
  );
};

export default Context;

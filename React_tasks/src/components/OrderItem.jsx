import "../styles/component/OrderItem.css";
import ReusableButton from "./ReusableButton";
import PropTypes from "prop-types";

const OrderItem = ({ item, onRemove }) => {
  const totalPrice = item.price * item.quantity;
  // console.log(item);
  return (
    <div className="order-item">
      <img src={item.img}></img>
      <div className="order-item-details">
        <span className="item-title">{item.title}</span>
        <div className="order-item-subdetails">
          <span className="item-qty">{item.quantity} pcs.</span>
          <span className="item-price">Rs {item.price}</span>
        </div>
      </div>
      <hr />

      <div className="order-item-total">
        <span className="total-price">
          <span>Total</span>
          <span>Rs {totalPrice}</span>
        </span>
        <ReusableButton
          buttonText="Remove"
          variant="danger"
          onClick={onRemove}
        />{" "}
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default OrderItem;

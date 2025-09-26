import "../styles/component/orderItem.css";
import Modal from "./Modal";
import Button from "./Button";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useState } from "react";
const modalRoot = document.getElementById("modal-root") || document.body;

const OrderItem = ({ item, onRemove }) => {
  const totalPrice = item.price * item.quantity;
  const [showModal, setShowModal] = useState(false);

  // console.log(item);
  return (
    <>
      <div className="order-item">
        <img src={item.img} alt={item.title} />
        <div className="order-item-details">
          <span className="item-title">{item.title}</span>
          <div className="order-item-subdetails">
            <span>{item.quantity} pcs.</span>
            <span>Rs {item.price}</span>
          </div>
        </div>

        <div className="order-item-total">
          <Button
            buttonText="Remove"
            variant="danger small"
            onClick={() => setShowModal(true)}
          />
          <div className="total-price">
            <span>Total</span>
            <span className="price">Rs {totalPrice}</span>
          </div>
        </div>

        {showModal &&
          createPortal(
            <Modal onRemove={onRemove} onClose={() => setShowModal(false)} />,
            modalRoot
          )}
      </div>
    </>
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

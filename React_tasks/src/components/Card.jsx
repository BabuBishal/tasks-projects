import "../styles/component/card.css";
import ReusableButton from "./ReusableButton";
const Card = ({ title, subtitle, price, onAddToCart }) => {
  return (
    <div className="card">
      <h4>{title}</h4>
      <h5>{subtitle}</h5>
      <h5>{price}</h5>
      <ReusableButton
        variant="secondary"
        buttonText="Add to Cart"
        onClick={onAddToCart}
      />
    </div>
  );
};

export default Card;

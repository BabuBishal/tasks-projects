import "../styles/component/productCard.css";
import ReusableButton from "./ReusableButton";
import PropTypes from "prop-types";

const ProductCard = ({ img, title, price, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={img} alt={title} />
      <h4 className="product-title">{title}</h4>
      {/* <h5>{category}</h5> */}
      <h5>Rs. {price}</h5>
      <ReusableButton
        variant="secondary"
        buttonText="Add to Cart"
        onClick={onAddToCart}
      />
    </div>
  );
};

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;

import ReusableInput from "./ReusableInput";
import ReusableButton from "./ReusableButton";

const Modal = ({ title, subtitle, content }) => {
  return (
    <div className="modal">
      <div>
        <h4>{title}</h4>
        <h5>{subtitle}</h5>
        <h5>{content}</h5>
      </div>

      <ReusableButton variant="secondary" buttonText="Add to Cart" />
      {/* <ReusableButton variant="secondary" buttonText="Add to Cart" /> */}
    </div>
  );
};

export default Modal;

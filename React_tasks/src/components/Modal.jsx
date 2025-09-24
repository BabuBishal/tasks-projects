import ReusableButton from "./ReusableButton";
import "../styles/component/modal.css";

const Modal = ({ onClose, onRemove }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <span className="confirm-delete">
          Are you sure you want to remove this item?
        </span>
        <div className="modal-actions">
          <ReusableButton
            variant="danger "
            buttonText="Remove"
            onClick={onRemove}
          />
          <ReusableButton
            variant="secondary"
            buttonText="Close"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;

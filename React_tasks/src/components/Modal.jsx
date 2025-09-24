import ReusableButton from "./ReusableButton";
import "../styles/component/modal.css";
import PropTypes from "prop-types";

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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Modal;

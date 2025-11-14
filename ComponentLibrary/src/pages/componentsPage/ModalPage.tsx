import { useState } from "react";
import Container from "../../shared/templates/container/Container";
import CodeBlock from "../../shared/templates/codeBlock/CodeBlock";
import Modal from "../../shared/ui/modal/Modal";
import { Button } from "../../shared/ui/button/Button";
const ModalCode = `  
const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
<Modal isOpen={isModalOpen} onClose={closeModal}>
  <h2>Welcome to the Modal!</h2>
  <p>This is some content inside the modal.</p>
  <p>You can put any React elements here.</p>
  <Button onClick={closeModal}>Close from inside</Button>
</Modal>
)`;

const ModalPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <section id="modal" className="section modal-section">
      <h2 className="section-heading">Modal</h2>
      <h4 className="section-desc">
        Modal elements for displaying content in a popup
      </h4>
      <Container title="Card" desc="Modal component">
        <Container.content>
          <Button onClick={openModal}>Open Modal</Button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2>Welcome to the Modal!</h2>
            <p>This is some content inside the modal.</p>
            <p>You can put any React elements here.</p>
            <br />
            <Button variant="primary" onClick={closeModal}>
              Close
            </Button>
          </Modal>
        </Container.content>
        <Container.code>
          <CodeBlock code={ModalCode} />
        </Container.code>
      </Container>
    </section>
  );
};

export default ModalPage;

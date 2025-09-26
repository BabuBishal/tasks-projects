import HelloWorld from "../../components/HelloWorld";
import Form from "../../components/Form/Form";
import "../../styles/pages/FormValidation.css";

const FormValidationPage = () => {
  return (
    <div className="form-validation-page">
      <HelloWorld title="Task 8: Form validation" description="" />
      <Form />
    </div>
  );
};

export default FormValidationPage;

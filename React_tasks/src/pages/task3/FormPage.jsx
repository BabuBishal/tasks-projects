import HelloWorld from "../../components/HelloWorld";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";

const FormPage = () => {
  return (
    <>
      <HelloWorld
        title="Task 3:Reusable Input and Button components"
        description=""
      />
      <Input label="First Name" placeholder="Enter your first name here..." />
      <Input label="Last Name" placeholder="Enter your last name here..." />
      <Button variant="primary" buttonText="variant = Primary" />
    </>
  );
};

export default FormPage;

import ReusableInput from "../../components/ReusableInput";
import ReusableButton from "../../components/ReusableButton";
import HelloWorld from "../../components/HelloWorld";

const FormPage = () => {
  return (
    <>
      <HelloWorld
        title="Task 3:Reusable Input and Button components"
        description=""
      />
      <ReusableInput
        label="First Name"
        placeholder="Enter your first name here..."
      />
      <ReusableInput
        label="Last Name"
        placeholder="Enter your last name here..."
      />
      {/* <ReusableInput placeholder="No label prop here..." /> */}
      <ReusableButton variant="primary" buttonText="variant = Primary" />
      {/* <ReusableButton variant="secondary" buttonText="variant = Secondary" /> */}
      {/* <ReusableButton /> */}
    </>
  );
};

export default FormPage;

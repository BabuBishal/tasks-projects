import { useState } from "react";
import ReusableButton from "../../components/ReusableButton";

const PropsLifting = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };
  return (
    <>
      <h3>Props lifting</h3>
      <h4>Count: {count}</h4>
      <ReusableButton
        onClick={handleIncrease}
        buttonText="Increase"
        variant="primary"
      />
    </>
  );
};

export default PropsLifting;

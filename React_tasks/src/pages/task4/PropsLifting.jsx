import { useState } from "react";
import Button from "../../components/Button";
import HelloWorld from "../../components/HelloWorld";

const PropsLifting = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };
  return (
    <>
      <HelloWorld title="Task 4: Props lifting" description="" />
      <h4>Count: {count}</h4>
      <Button
        onClick={handleIncrease}
        buttonText="Increase"
        variant="primary"
      />
    </>
  );
};

export default PropsLifting;

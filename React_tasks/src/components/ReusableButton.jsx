import React from "react";

const ReusableButton = ({ buttonText = "Button", variant }) => {
  return <button className={` button ${variant}`}>{buttonText}</button>;
};

export default ReusableButton;

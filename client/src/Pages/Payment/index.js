import React from "react";
import Header from "../../Components/header";
import StepRegister from "../../Components/StepRegister";

export default function Payment() {
  return (
    <div>
     
      <Header />
      <StepRegister current={1} />
    </div>
  );
}

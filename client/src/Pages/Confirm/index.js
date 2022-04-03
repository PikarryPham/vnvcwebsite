import React from "react";
import Header from "../../Components/header";
import StepRegister from "../../Components/StepRegister";

export default function Confirm() {
  return (
    <div>
     
      <Header />
      <StepRegister current={2} />
    </div>
  );
}

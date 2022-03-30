import { Steps } from "antd";

import React, { useEffect } from "react";

const { Step } = Steps;

export default function StepRegister({current}) {
  useEffect(() => {}, []);

  return (
    <Steps current={current} style={{paddingLeft:'25px', paddingRight:'25px'}}>
      <Step title="Bước 1" description="Thông tin người được tiêm" />
      <Step
        title="Bước 2"
        description="Thanh toán"
      />
      <Step title="Bước 3" description="Xác nhận từ VNVC" />
    </Steps>
  );
}

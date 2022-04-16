import React from "react";
import { Modal } from "antd";

export default function NumCustomerModal({
  isModalVisible2,
  showModal,
  handleCancel2,
  messageAddCustomer,
}) {
  return (
    <div>
      <Modal
        visible={isModalVisible2}
        onOk={() => {
          showModal();
          handleCancel2();
        }}
        onCancel={handleCancel2}
        cancelText={"Thêm người tiêm"}
        okText={"Xem điều khoản và thanh toán"}
      >
        <p>{messageAddCustomer}</p>
      </Modal>
    </div>
  );
}

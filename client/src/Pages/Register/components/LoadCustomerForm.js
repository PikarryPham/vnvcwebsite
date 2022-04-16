import React from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Divider
} from "antd";

export default function LoadCustomerForm({ onFinish2, form2 }) {
  return (
    <div>
      <div style={{ marginLeft: 20, marginTop: 10 }}>
        <h2>THÔNG TIN NGƯỜI ĐƯỢC TIÊM </h2>
        Quý khách có thể đăng ký cùng lúc cho tối đa 5 người tiêm, VNVC chỉ thực
        hiện tiêm chủng cho Khách hàng có thông tin đăng ký trùng khớp hoàn toàn
        với thông tin Quý Khách cung cấp tại đây.
      </div>
      <br />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish2}
        form={form2}
      >
        <Form.Item
          label="Nhập mã khách hàng tại VNVC"
          name="MaKhachHang_VNVC"
          rules={[{ required: true, message: "This field is required." }]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>

        <Form.Item
          label="Ngày tháng năm sinh"
          name="NgayThangNamSinh"
          rules={[{ required: true, message: "This field is required." }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Kiểm tra
          </Button>
        </Form.Item>
      </Form>
      <Divider />
    </div>
  );
}

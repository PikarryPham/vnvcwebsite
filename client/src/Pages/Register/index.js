import React from "react";
import { Form, Input, DatePicker, Select, List, Avatar, Button } from "antd";
import Header from "../../Components/header";
import { Row, Col, Typography, Divider } from "antd";
import { Title } from "./styled";
const { Option } = Select;

export default function Register() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const data = [
    "Racing car sprays burning fuel into crowd. ",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];

  return (
    <div>
      <Header />

      <Row>
        <Col span={12}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Họ và tên"
              name="HoTen"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name="NgayThangNamSinh"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="GioiTinh"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }}>
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="SDT"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Số nhà"
              name="SoNha"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Tỉnh/ Thành"
              name="Tinh_Thanh"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }}>
                <Option value="Nam">Mỹ Tho</Option>
                <Option value="Nữ">Cà Mau</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Quận/ Huyện"
              name="Quan_Huyen"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }}>
                <Option value="Nam">Mỹ Tho</Option>
                <Option value="Nữ">Cà Mau</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Phường/ Xã"
              name="Phuong_Xa"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }}>
                <Option value="Nam">Mỹ Tho</Option>
                <Option value="Nữ">Cà Mau</Option>
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button style={{ marginRight: 10 }}>Nhập lại</Button>

              <Button type="primary" htmlType="submit">
                Tiếp tục
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col>
          <List
            header={<Title>DANH SÁCH NGƯỜI TIÊM
              </Title>}
            footer={<Button type="primary">Xem điều khoản và đăng ký</Button>}
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item style={{ width: "100vh" }}>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}

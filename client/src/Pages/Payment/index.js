import React from "react";
import Header from "../../Components/header";
import StepRegister from "../../Components/StepRegister";
import Footer from "../../Components/footer";
import { useState, useLayoutEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Radio,
} from "antd";
import { useNavigate } from "react-router-dom";
import ListCustomer from "../../Components/ListCustomer";

import { instance } from "../../utils/axios";

const { Option } = Select;
const { Title } = Typography;

export default function Payment() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useLayoutEffect(() => {
    setCustomers(JSON.parse(localStorage.getItem("customers")));

    instance.post("/register/get-province").then((res) => {
      setProvinces(res.data);
    });
  }, []);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [curretnProvince, setCurrentProvince] = useState("");

  const onChangeTinhThanh = (e) => {
    setCurrentProvince(e);

    form.setFieldsValue({
      Quan_Huyen_NguoiMua: null,
      Phuong_Xa_NguoiMua: null,
    });

    instance
      .post("/register/get-district", {
        Tinh_Thanh: e,
      })
      .then((res) => {
        setDistricts(res.data);
      });
  };

  const onChangeQuanHuyen = (e) => {
    form.setFieldsValue({ Phuong_Xa_NguoiMua: null });

    instance
      .post("/register/get-commune", {
        Tinh_Thanh: curretnProvince,
        Quan_Huyen: e,
      })
      .then((res) => {
        setCommunes(res.data);
      });
  };

  const onFinish = (values) => {
    const body = {
      nguoimua: values,
      nguoitiem: customers,
    };

    instance.post("/register/add-infor", body).then((res) => {
      navigate("/confirm/" + res.data.id);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Header />
      <StepRegister current={1} />

      <Row>
        <Col span={12}>
          <div style={{ marginLeft: 30, marginRight: 30 }}>
            <Title
              level={2}
              orientation="center"
              style={{ width: "100%", textAlign: "center" }}
            >
              THÔNG TIN NGƯỜI MUA
            </Title>
            Thông tin này để chúng tôi liên lạc khi cần thiết. Quý khách có thể
            đăng ký vắc xin cho 5 người cùng lúc, tất cả thông tin quý khách cần
            cung cấp chính xác để chúng tôi xác thực khi đến trung tâm
          </div>
          <Divider />
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Họ và tên"
              name="HoTenNguoiMua"
              rules={[
                { required: true, message: "This field is required." },
                {
                  pattern: /^[^\d]+/,
                  message: "The input is not valid full name!",
                },
              ]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="SDTNguoiMua"
              rules={[
                { required: true, message: "This field is required." },
                {
                  pattern:
                    /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/,
                  message: "The input is not valid phone!",
                },
              ]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="EmailNguoiMua"
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
              label="CMND/ CCCD/ PASSPORT"
              name="CMND_CCCD_NguoiMua"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
                {
                  min: 9,
                  message: "CMND/ CCCD/ PASSPORT must be minimum 8 characters.",
                },
              ]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Số nhà"
              name="SoNha_NguoiMua"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Tỉnh/ Thành"
              name="Tinh_Thanh_NguoiMua"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }} onChange={onChangeTinhThanh}>
                {provinces.map((value) => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Quận/ Huyện"
              name="Quan_Huyen_NguoiMua"
              rules={[{ required: true, message: "This field is required." }]}
              value={"Hà Nội"}
            >
              <Select
                allowClear
                style={{ width: 300 }}
                onChange={onChangeQuanHuyen}
              >
                {districts.map((value) => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Phường/ Xã"
              name="Phuong_Xa_NguoiMua"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }}>
                {communes.map((value) => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Phương thức thanh toán"
              name="PhuongThucThanhToan"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Radio.Group>
                <Radio
                  value={" Thanh toán bằng thẻ thanh toán nội địa (ATM)"}
                  disabled
                >
                  Thanh toán bằng thẻ thanh toán nội địa (ATM)
                </Radio>
                <Radio value={"Thanh toán bằng thẻ VISA/ MASTER/JCB"} disabled>
                  Thanh toán bằng thẻ VISA/ MASTER/JCB
                </Radio>
                <Radio value={"Thanh toán qua chuyển khoản"}>
                  Thanh toán qua chuyển khoản
                </Radio>{" "}
                <br />
                <Radio value={"Thanh toán tại trung tâm"}>
                  Thanh toán tại trung tâm
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                style={{ marginRight: 10 }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                Nhập lại
              </Button>

              <Button type="primary" htmlType="submit">
                Tiếp tục
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={12}>
          <ListCustomer
            customers={customers}
            setCustomers={setCustomers}
            showModal={null}
            showButtonFooter={false}
          />
        </Col>
      </Row>

      <Footer />
    </div>
  );
}

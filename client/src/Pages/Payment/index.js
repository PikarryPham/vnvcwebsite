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
import {CheckPhoneNumberContainLetter, CheckNotContainNumber, OnlyContainNumber} from "../../utils";

import { instance } from "../../utils/axios";

const { Option } = Select;
const { Title } = Typography;


export default function Payment() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const [displayInformationThanhToan, setDisplayInformationThanhToan] = useState(false);
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

  const onChangeThanhToan = (e) => {
    console.log(e);
    if(e.target.value === "Thanh toán qua chuyển khoản")
    {
      setDisplayInformationThanhToan(true);
    }
    else setDisplayInformationThanhToan(false);
  }

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
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || CheckNotContainNumber(getFieldValue('HoTenNguoiMua'))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Name is not valid'));
                  },
                }),
              ]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="SDTNguoiMua"
              rules={[
                { required: true, message: "This field is required." },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || CheckPhoneNumberContainLetter(getFieldValue('SDTNguoiMua'))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The user phone number is not valid!'));
                  },
                }),
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
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || OnlyContainNumber(getFieldValue('CMND_CCCD_NguoiMua'))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('CCCD/CMND is not valid!'));
                  },
                }),
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
              <Radio.Group onChange={onChangeThanhToan}>
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
                {
                  displayInformationThanhToan && <div className="thanhtoanquack" style={{fontSize:'1rem'}}>
                  <div data-v-9814c6fc=""><div data-v-9814c6fc="">
                      Khi thanh toán tiền, Quý khách hàng vui lòng ghi rõ nội dung
                      chuyển khoản như sau:
                  </div><div data-v-9814c6fc="" className="pt-2"><span data-v-9814c6fc="" style={{fontWeight:'bold'}}>
                        "Số điện thoại"_"Mã đặt mua".</span></div></div>
                  <div data-v-9814c6fc="" className="mt-2">
                      Nội dung chuyển khoản chính xác sẽ được chúng tôi cung cấp tại
                      bước tiếp theo.
                  </div>
                  <div data-v-9814c6fc="" className="h4 font-weight-bolder mt-3">
                      <h3>Thông tin đơn vị thụ hưởng</h3>
                  </div>
                  <div data-v-9814c6fc="" style={{display:'flex',flexDirection:'row'}}>
                  <div data-v-9814c6fc="" style={{padding:'0.5rem 0 0.5rem 0',width:'50%'}}><span data-v-9814c6fc="" className="h6 font-weight-bolder">Miền Bắc</span> <div data-v-9814c6fc="" className="h6 font-weight-bolder pt-2">
                      1. Vietcombank
                  </div> <div data-v-9814c6fc="" style={{display:'flex',flexDirection:'row'}}><div data-v-9814c6fc="" className="d-flex mr-2" style={{marginRight:'0.5rem'}}></div> <span data-v-9814c6fc="" style={{marginTop:'0.5rem'}}>Chủ TK: Công ty cổ phần vắc xin Việt Nam</span></div> 
                  <div data-v-9814c6fc="" style={{display:'flex',flexDirection:'row'}}><div data-v-9814c6fc="" style={{marginRight:'0.5rem'}} ></div> <span data-v-9814c6fc="" style={{marginTop:'0.5rem'}}>STK :
                        <strong data-v-9814c6fc="" style={{color:'red'}}> 0961000035722</strong></span></div> <div data-v-9814c6fc="" style={{display:'flex',flexDirection:'row'}}><div data-v-9814c6fc="" className="d-flex mr-2" style={{marginRight:'0.5rem'}}></div> <span data-v-9814c6fc="" style={{marginTop:'0.5rem'}}>
                        Ngân hàng: TMCP Ngoại thương VN - Chi nhánh 
                        Đông Anh, Hà Nội
                      </span></div></div> 
                  <div data-v-9814c6fc="" style={{padding:'0.5rem 0 0.5rem 0',width:'50%'}}>
                      <span data-v-9814c6fc="" className="h6 font-weight-bolder">Miền Nam</span> 
                      <div data-v-9814c6fc="" className="h6 font-weight-bolder pt-2">1. Techcombank</div> 
                  <div data-v-9814c6fc="" className="h6 pt-3 d-flex" style={{display:'flex',flexDirection:'row'}}><div data-v-9814c6fc="" className="margin-right: 0.5rem;" style={{marginRight:'0.5rem'}}></div> <span data-v-9814c6fc="" style={{marginTop:'0.5rem'}}>Chủ TK: Công ty cổ phần vắc xin Việt Nam - CN
                        TP.HCM</span></div> <div data-v-9814c6fc="" className="h6  d-flex"  style={{display:'flex',flexDirection:'row'}}><div data-v-9814c6fc="" className="d-flex mr-2" style={{marginRight:'0.5rem'}}></div> <span data-v-9814c6fc="" style={{marginTop:'0.5rem'}}>STK :
                        <strong data-v-9814c6fc="" style={{color:'red'}}>
                          19132680330012
                        </strong></span></div> <div data-v-9814c6fc="" className="h6  d-flex"  style={{display:'flex',flexDirection:'row'}}><div data-v-9814c6fc="" className="d-flex mr-2" style={{marginRight:'0.5rem'}}></div> <span data-v-9814c6fc="" style={{marginTop:'0.5rem'}}>
                        Ngân hàng: Techcombank – CN Thắng Lợi, Tp.HCM
                  </span></div></div>
              </div>
              <div data-v-9814c6fc="" style={{color:'#2a388f',marginBottom:'0.5rem'}}>
                  Lưu ý: Nếu quý khách đã chuyển tiền nhưng không nhận được tin
                  báo từ VNVC sau 24h, vui lòng liên hệ
                  <span data-v-9814c6fc="" className="" style={{fontWeight: 'bold',color:'#f39021'}}>
                    hotline 028 7300 6595
                  </span>
                  để được hỗ trợ
              </div>
                                                </div>
                }
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
            edit={false}
          />
        </Col>
      </Row>

      <Footer />
    </div>
  );
}

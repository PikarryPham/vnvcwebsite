import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Modal,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import Header from "../../Components/header";
import Footer from "../../Components/footer";
import StepRegister from "../../Components/StepRegister";
import { instance } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { parseListOfVaccines } from "../../utils";
import moment from "moment";
import ListCustomer from "../../Components/ListCustomer";
import LoadCustomerForm from "./components/LoadCustomerForm";
import TermModal from "./components/TermModal";
import NumCustomerModal from "./components/NumCustomerModal";

const { Option } = Select;

export default function Register() {
  //form chính
  const [form] = Form.useForm();
  const [initialValueForm, setInitialValueForm] = useState({});

  //form để tìm khách hàng cũ
  const [form2] = Form.useForm();

  const [modal, setModal] = useState(false);
  const [customers, setCustomers] = useState([]);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const navigate = useNavigate();

  const [listVaccines, SetListVaccines] = useState([]);
  const [diaDiemTiem, setDiaDiemTiem] = useState([]);
  const [trungTamVaccine, setTrungTamVaccine] = useState([]);

  useEffect(() => {
    instance.post("/register/get-vaccines").then((res) => {
      SetListVaccines(res.data);
    });

    instance.post("/register/get-vaccine-province").then((res) => {
      setDiaDiemTiem(res.data);
    });

    instance.post("/register/get-province").then((res) => {
      setProvinces(res.data);
    });
  }, []);

  const [curretnProvince, setCurrentProvince] = useState("");
  const onChangeTinhThanh = (e) => {
    setCurrentProvince(e);

    form.setFieldsValue({ Quan_Huyen: null, Phuong_Xa: null });

    instance
      .post("/register/get-district", {
        Tinh_Thanh: e,
      })
      .then((res) => {
        setDistricts(res.data);
      });
  };

  const onChangeQuanHuyen = (e) => {
    form.setFieldsValue({ Phuong_Xa: null });

    instance
      .post("/register/get-commune", {
        Tinh_Thanh: curretnProvince,
        Quan_Huyen: e,
      })
      .then((res) => {
        setCommunes(res.data);
      });
  };

  const onChangeDiaDiemTiem = (e) => {
    instance
      .post("/register/get-vaccine-center", { Tinh_Thanh: e })
      .then((res) => {
        setTrungTamVaccine(res.data);
      });
  };

  //modal nhấn vô đi qua trang thanh toán
  const showModal = () => {
    setModal(true);
  };

  const handleOk = () => {
    setModal(false);

    //console.log(customers)
    //instance.post("/register/add-infor", { customers });
    localStorage.setItem("customers", JSON.stringify(customers));

    navigate("/payment");
  };

  const handleCancel = () => {
    setModal(false);
  };

  //modal nhấn vô nhắc người dủng còn thêm được bao nhiêu người nửa
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    form.resetFields();
    setIsModalVisible2(false);
  };

  const [messageAddCustomer, setMessageAddCustomer] = useState("");

  const onFinish = (values) => {
    values = {
      ...values,
      vaccine: parseListOfVaccines(values.vaccine),
    };

    if (customers.length < 5) {
      setMessageAddCustomer(
        `Đã thêm thành công, Quý khách còn thêm được ${
          4 - customers.length
        } người.`
      );
      setCustomers([...customers, values]);
      showModal2();
    } else {
      setMessageAddCustomer(`Không thể thêm được nửa, do tối đa là 5 người`);
      showModal2();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const openNotificationWithIcon = (type) => {
    if (type === "error") {
      notification[type]({
        description: "Không tìm thấy thông tin khách hàng.",
        placement: "topLeft",
      });
    } else if (type === "success") {
      notification[type]({
        description: "Tìm được thông tin khách hàng.",
        placement: "topLeft",
      });
    }
  };

  const onFinish2 = (values) => {
    form2.resetFields(); //reset form

    instance.post("/register/get-customer", values).then((res) => {
      if (res.data) {
        openNotificationWithIcon("success");
        let data = res.data;
        data.NgayThangNamSinh = moment(data.NgayThangNamSinh);
        data.NgayMongMuonTiem = moment(data.NgayMongMuonTiem);

        delete data.NgayMongMuonTiem;
        delete data.MoiQuanHe;
        delete data.DiaDiemTiem;
        delete data.TrungTamVNVC;
        delete data.vaccine;

        form.setFieldsValue(data);
      } else {
        openNotificationWithIcon("error");
      }
    });
  };

  return (
    <div>
      <Header />
      <StepRegister current={0} />

      <Row>
        <Col span={12}>
          <LoadCustomerForm onFinish2={onFinish2} form2={form2} />

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={initialValueForm}
            
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}

            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Họ và tên"
              name="HoTen"
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
              label="Ngày sinh"
              name="NgayThangNamSinh"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Ngày mong muốn tiêm"
              name="NgayMongMuonTiem"
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
              label="Mối quan hệ"
              name="MoiQuanHe"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }}>
                <Option value="Cha">Cha</Option>
                <Option value="Mẹ">Mẹ</Option>
                <Option value="Con">Con</Option>
                <Option value="Ông">Ông</Option>
                <Option value="Bà">Bà</Option>
                <Option value="Bản thân">Bản thân</Option>
              </Select>
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
              <Select style={{ width: 300 }} onChange={onChangeTinhThanh}>
                {provinces.map((value) => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Quận/ Huyện"
              name="Quan_Huyen"
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
              name="Phuong_Xa"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }}>
                {communes.map((value) => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="CHỌN ĐỊA ĐIỂM MONG MUỐN TIÊM"
              name="DiaDiemTiem"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }} onChange={onChangeDiaDiemTiem}>
                {diaDiemTiem.map((value) => (
                  <Option value={value}>{value}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Trung tâm VNVC gần quý khách"
              name="TrungTamVNVC"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }}>
                {trungTamVaccine.map((value) => (
                  <Option value={value.TenTrungTam}>
                    {value.TenTrungTam + " - " + value.DiaChi}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="CHỌN VẮC XIN CHO NGƯỜI TIÊM"
              name="vaccine"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select
                mode="multiple"
                maxTagCount="responsive"
                style={{ width: 300 }}
              >
                {listVaccines.map((value) => (
                  <Option
                    value={JSON.stringify({
                      MaVaccine: value.MaVaccine,
                      TenVaccine: value.Ten,
                      GiaVaccine: value.Gia,
                    })}
                  >
                    {value.LoaiVaccine +
                      ", " +
                      value.Ten +
                      ", " +
                      value.PhongBenh +
                      ", " +
                      value.ThongTinVeVaccine}
                  </Option>
                ))}
              </Select>
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
            showModal={showModal}
          />
        </Col>
      </Row>

      <TermModal
        modal={modal}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      <NumCustomerModal
        isModalVisible2={isModalVisible2}
        showModal={showModal}
        handleCancel2={handleCancel2}
        messageAddCustomer={messageAddCustomer}
      />

      <Footer />
    </div>
  );
}

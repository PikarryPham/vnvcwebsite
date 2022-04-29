import React, { useState } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
import { instance } from "../utils/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {parseListOfVaccines} from "../utils"

const { Option } = Select;

export default function EditCustomerModal({ index, customers, setCustomers }) {
  //form chính
  const [form] = Form.useForm();
  const [initialValueForm, setInitialValueForm] = useState({});

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  const [listVaccines, SetListVaccines] = useState([]);
  const [diaDiemTiem, setDiaDiemTiem] = useState([]);
  const [trungTamVaccine, setTrungTamVaccine] = useState([]);

  

  useEffect(() => {

    //console.log(customers[index]);

    let temp = {...customers[index]}

    temp.NgayThangNamSinh = moment(temp.NgayThangNamSinh)
    temp.NgayMongMuonTiem = moment(temp.NgayMongMuonTiem)
    

    let temp2 = []
    for (const iterator of temp.vaccine) {
   
      temp2.push( JSON.stringify({
        MaVaccine: iterator.MaVaccine,
        TenVaccine: iterator.TenVaccine,
        GiaVaccine: iterator.GiaVaccine,
      }))
    }

    //console.log(temp2)

    form.setFieldsValue({...temp,vaccine:temp2})

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

  const onFinish = (values) => {

    let newCustomers = [...customers]
    newCustomers[index] = values

    newCustomers[index].vaccine = parseListOfVaccines(newCustomers[index].vaccine )

    //console.log(customers)
    //console.log(newCustomers)

    setCustomers(newCustomers)
    localStorage.setItem("customers", JSON.stringify(newCustomers));
setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {" "}
      <EditOutlined onClick={showModal} />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{}}
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
      </Modal>
    </>
  );
}

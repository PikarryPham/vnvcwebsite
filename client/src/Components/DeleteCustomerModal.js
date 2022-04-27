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
import { parseListOfVaccines } from "../utils";

const { Option } = Select;

export default function DeleteCustomerModal({
  index,
  customers,
  setCustomers,
}) {
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

    let temp = { ...customers[index] };

    temp.NgayThangNamSinh = moment(temp.NgayThangNamSinh);
    temp.NgayMongMuonTiem = moment(temp.NgayMongMuonTiem);

    let temp2 = [];
    for (const iterator of temp.vaccine) {
      temp2.push(
        JSON.stringify({
          MaVaccine: iterator.MaVaccine,
          TenVaccine: iterator.TenVaccine,
          GiaVaccine: iterator.GiaVaccine,
        })
      );
    }

    //console.log(temp2)

    form.setFieldsValue({ ...temp, vaccine: temp2 });

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

  const onFinish = () => {
    let newCustomers = [...customers];
    newCustomers.splice(index,1)
  
    setCustomers(newCustomers);
    localStorage.setItem("customers", JSON.stringify(newCustomers));
    setIsModalVisible(false);
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
      <DeleteOutlined onClick={showModal} />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={handleCancel}
      >

        Bạn có chắc xóa không ?
        
      </Modal>
    </>
  );
}

import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { parseListOfVaccines, giaVaccine,tongTien } from "../utils"
import {
    Form,
    Input,
    DatePicker,
    Select,
    List,
    Avatar,
    Modal,
    Button,
    Divider
  } from "antd";
  import { Title } from "./styled";

import {EyeOutlined,EditOutlined, DeleteOutlined} from '@ant-design/icons';
import ViewCustomerModal from "./ViewCustomerModal";
import EditCustomerModal from "./EditCustomerModal";
import DeleteCustomerModal from "./DeleteCustomerModal";

export default function ListCustomer({ customers,setCustomers, showModal,showButtonFooter=true }) {
  return (
    <List
      size="large"
      header={<Title>DANH SÁCH NGƯỜI TIÊM</Title>}
      footer={
        <div style={{marginTop:-30}}>
          <span > <span style={{ fontSize: 16, fontWeight: 700 }}>Tổng tiền: </span> {tongTien(customers).toLocaleString()} VNĐ</span>
          <br />
         { showButtonFooter&&<Button type="primary" onClick={showModal}>
            Xem điều khoản và đăng ký
          </Button>}
        </div>
      }
      bordered

      dataSource={customers}

      renderItem={(item,index) => (
        <div style={{marginLeft:30,paddingTop:10}}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            {item.HoTen} ({item.MoiQuanHe}) 
            <ViewCustomerModal index={index} customers={customers} setCustomers={setCustomers}  /> 
            <EditCustomerModal index={index} customers={customers} setCustomers={setCustomers}  />
            <DeleteCustomerModal index={index} customers={customers} setCustomers={setCustomers}  />
          </div>

          <div>
          <span style={{ fontSize: 16, fontWeight: 700 }}>  Vắc xin:</span>
          
            {item.vaccine.map((value) => (
              <div> - {value.TenVaccine}</div>
            ))}
          </div>

          <div><span style={{ fontSize: 16, fontWeight: 700 }}>Trung tâm: </span> {item.TrungTamVNVC}</div>

          <div ><span style={{ fontSize: 16, fontWeight: 700 }}>Tổng tiền: </span>{giaVaccine(item.vaccine).toLocaleString()} VNĐ</div>

          <Divider />
        </div>
      )}
    />
  );
}

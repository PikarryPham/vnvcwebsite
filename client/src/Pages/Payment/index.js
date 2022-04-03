import React from "react";
import Header from "../../Components/header";
import StepRegister from "../../Components/StepRegister";
import { useLocation } from "react-router-dom";

import { useState, useLayoutEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  List,
  Avatar,
  Modal,
  Button,
} from "antd";

import { Row, Col, Typography, Divider } from "antd";

export default function Payment() {
  const [customers, setCustomers] = useState([]);

  useLayoutEffect(() => {
    setCustomers(JSON.parse(localStorage.getItem("customers")));
  },[]);

  return (
    <div>
      <Header />
      <StepRegister current={1} />

      <Row>
        <Col span={12}></Col>

        <Col>
          <List
            dataSource={customers}
            
            renderItem={(item) => (
              <List.Item style={{ width: "100vh" }}>
                <Typography.Text style={{ fontSize: 20, fontWeight: 700 }}>
                  {item.HoTen} ({item.MoiQuanHe})
                </Typography.Text>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}

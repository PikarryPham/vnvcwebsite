import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  Avatar,
  Image,
  Tooltip,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import { instance } from "../utils/axios";
import { ProfileOutlined } from "@ant-design/icons";

import "./style.css";
import { notification, Modal } from "antd";

const { Search } = Input;
const { Option } = Select;


export default function Header({ setKeyword }) {
  const [modalSearch, setModalSearch] = useState(false);

  const showModalSearch = () => {
    setModalSearch(true);
  };

  const handleSearchOk = () => {
    setModalSearch(false);
  };

  const handleSearchCancel = () => {
    setModalSearch(false);
  };

  const onSearch = (value) => {
    setKeyword(value.trim());
  };

  let navigate = useNavigate();

  const navigateHome = () => {
    navigate("/home");
    navigate(0);
  };

  return (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      <div>
        <img
          src="/topimage.jpg"
          alt="image"
          width={"100%"}
          onClick={navigateHome}
        />
      </div>

      <div
        style={{
          minHeight: "100px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          backgroundColor: "#ADB3A6",
        }}
      >
        <div style={{ marginLeft: "30px", cursor: "pointer" }}>
          <img
            src="/logo.jpg"
            alt="image"
            height={"50px"}
            onClick={navigateHome}
          />
        </div>

        <div style={{ marginLeft: "10px" }}>
          <Search
            placeholder="Nhập từ khóa để tìm kiếm"
            onSearch={onSearch}
            style={{ width: 304 }}
          />
        </div>

        <a style={{ marginLeft: "20px" }} onClick={showModalSearch}>
          Tìm kiếm nâng cao
        </a>

        <div
          style={{
            marginLeft: "auto",
            cursor: "pointer",
            marginRight: "30px",
            display: "flex",
          }}
        ></div>

        <Modal
          title="Nhập các thông tin để tìm kiếm chính xác"
          visible={modalSearch}
          onOk={handleSearchOk}
          onCancel={handleSearchCancel}
        >
          Chức năng đang được phát triển
        </Modal>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
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
import Header from "../../Components/header";
import StepRegister from "../../Components/StepRegister";
import { Row, Col, Typography, Divider } from "antd";
import { Title } from "./styled";
import { instance } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { parseListOfVaccines } from "../../utils";

const { Option } = Select;

export default function Register() {
  const [modal, setModal] = useState(false);
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();

  const [listVaccines, SetListVaccines] = useState([]);

  useEffect(() => {
    instance.post("/register/get-vaccines").then((res) => {
      SetListVaccines(res.data);
    });
  }, []);

  //modal nhấn vô đi qua trang thanh toán
  const showModal = () => {
    setModal(true);
  };

  const handleOk = () => {
    setModal(false);

    instance.post("/register/add-infor", { customers });

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
    setIsModalVisible2(false);
  };

  const [messageAddCustomer, setMessageAddCustomer] = useState("");

  const onFinish = (values) => {
    console.log(values);

    values = {
      ...values,
      ListVaccines: parseListOfVaccines(values.ListVaccines),
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

  return (
    <div>
      <Header />
      <StepRegister current={0} />

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
              rules={[{ required: true, message: "This field is required." },{
                pattern: /^[^\d]+/,
                message: 'The input is not valid full name!',
            }]}
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
              rules={[{ required: true, message: "This field is required." },
              {
                pattern: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/,
                message: 'The input is not valid phone!',
            }]}
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

            <Form.Item
              label="CHỌN ĐỊA ĐIỂM MONG MUỐN TIÊM"
              name="DiaDiemTiem"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }}>
                <Option value="Nam">Mỹ Tho</Option>
                <Option value="Nữ">Cà Mau</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Trung tâm VNVC gần quý khách"
              name="TrungTamVNVC"
              rules={[{ required: true, message: "This field is required." }]}
            >
              <Select style={{ width: 300 }}>
                <Option value="Nam">Mỹ Tho</Option>
                <Option value="Nữ">Cà Mau</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="CHỌN VẮC XIN CHO NGƯỜI TIÊM"
              name="ListVaccines"
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
                      MaVaccine: value.MaVacXin,
                      TenVaccine: value.Ten,
                      GiaVaccine: value.Gia,
                    })}
                  >
                    {value.LoaiVacXin +
                      ", " +
                      value.Ten +
                      ", " +
                      value.ThongTinVeVacXin}
                  </Option>
                ))}
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
            header={<Title>DANH SÁCH NGƯỜI TIÊM</Title>}
            footer={
              <Button type="primary" onClick={showModal}>
                Xem điều khoản và đăng ký
              </Button>
            }
            bordered
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

      <Modal
        title="Basic Modal"
        visible={modal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        QUY ĐỊNH KHI ĐẶT GIỮ VẮC XIN ĐỊNH NGHĨA <br />
        ● Người mua: là người đại diện thực hiện đăng ký thông tin và thanh toán
        cho bản thân hoặc người thân của mình. - VNVC sẽ liên hệ với người mua
        để xác nhận chi tiết thông tin về ngày giờ và địa điểm tiêm chủng dựa
        theo mã đăng ký khách hàng được cung cấp ngay sau khi hoàn tất đặt mua
        hoặc/và thanh toán. Mỗi đơn đặt giữ vắc xin sẽ nhận được một mã đăng ký.
        - Người mua phải là công dân Việt Nam hoặc người nước ngoài sinh sống
        hợp pháp tại Việt Nam trên 15 tuổi. <br />
        ● Người tiêm: là người sẽ được tiêm loại vắc xin mà người mua đã đặt giữ
        nếu đạt đủ các tiêu chuẩn quy định về sức khỏe. - VNVC chỉ thực hiện
        tiêm chủng cho người tiêm có thông tin cá nhân trùng khớp hoàn toàn với
        thông tin đã đặt giữ và có mối quan hệ theo quy định với người mua. -
        Nếu người tiêm dưới 14 tuổi, các thông tin về số điện thoại, email, địa
        chỉ, nghề nghiệp và đơn vị công tác của người tiêm là thông tin đăng ký
        của người giám hộ hợp pháp. - Tuỳ theo loại vắc xin đặt giữ, người tiêm
        có thể được yêu cầu trả lời một số câu hỏi sàng lọc trước khi hoàn tất
        đặt giữ vắc xin. <br /> QUY ĐỊNH ĐĂNG KÝ <br />
        ● Một người mua được đăng ký nhiều lần không giới hạn số người tiêm.
        Người mua có thể đặt giữ vắc xin cho tối đa 1 người tiêm trong một đơn
        hàng trên ứng dụng ePlus hoặc tối đa 5 người tiêm trong một đơn hàng
        trên website vax.vnvc.vn, bao gồm cả bản thân người mua. <br />● Người
        tiêm chỉ được đặt giữ tối đa 3 loại “Vắc xin đặt giữ theo yêu cầu”: mỗi
        khách hàng chỉ được đặt mua 01 mũi vắc xin cho mỗi loại, và được đặt mua
        tối đa 03 loại vắc xin. ● Mũi tiêm tiếp theo chỉ được đặt giữ 28 ngày
        sau khi đã hoàn tất mũi tiêm trước. Đối với các vắc xin đặc biệt thời
        gian quy định có thể dài hơn tuỳ theo phác đồ tiêm chủng. <br />● Một
        Người tiêm có thể đặt giữ không giới hạn số lượng Gói vắc xin. <br />
        QUY ĐỊNH VỀ GIÁ VẮC XIN <br /> *** Giá vắc xin bao gồm giá lẻ, giá gói
        và phí đặt giữ. <br /> GIÁ GÓI <br />
        ● Chúng tôi lựa chọn những vắc xin nhập khẩu từ nước ngoài của các hãng
        sản xuất uy tín, nổi tiếng thế giới và số ít các vắc xin được sản xuất
        tại Việt Nam đã được kiểm chứng về độ hiệu quả và an toàn. Toàn bộ vắc
        xin trong hệ thống phòng tiêm được bảo quản nghiêm ngặt theo khuyến cáo
        của Tổ chức Y tế Thế giới (WHO) và nhà sản xuất. ● Chúng tôi cam kết
        cung cấp đầy đủ vắc xin theo gói của Quý khách hàng đã lựa chọn, đảm bảo
        quyền lợi cho Quý khách hàng ngay cả khi tình trạng khan hiếm vắc xin có
        thể xảy ra. Khách hàng được giữ giá vắc xin đã mua theo thoả thuận trong
        suốt quá trình sử dụng gói. <br />
        ● Trường hợp có sự biến động lớn về giá nhập mua trên thị trường, giá
        gói vắc xin có thể thay đổi. GIÁ VẮC XIN ĐẶT GIỮ Giá vắc xin đặt giữ
        theo yêu cầu = giá vắc xin + phí đặt giữ (được tính bằng 20% giá bán lẻ
        vắc xin đó tại thời điểm thanh toán). Phí này bao gồm: <br />
        ● Chi phí đảm bảo khách hàng được sử dụng vắc xin theo thời gian phù hợp
        với phác đồ và chỉ định của bác sĩ trong vòng 12 tháng kể từ ngày đăng
        ký dịch vụ. <br />
        ● Chi phí lưu giữ, bảo quản vắc xin lên đến 12 tháng trong điều kiện bảo
        quản chuyên nghiệp của VNVC. <br />● Chi phí chống trượt giá: khách hàng
        không phải đóng thêm bất cứ chi phí nào ngay cả khi vắc xin tăng giá.{" "}
        <br />
        ● Chi phí vận chuyển, luân chuyển vắc xin để đảm bảo khách hàng được
        phục vụ đúng thời gian yêu cầu. QUY ĐỊNH VỀ THANH TOÁN <br />
        ● Tất cả đơn đặt giữ vắc xin cần có sự tư vấn và xác nhận của tổng đài
        chăm sóc khách hàng trước khi đơn đặt giữ vắc xin được xác nhận có hiệu
        lực thực hiện tiêm chủng tại trung tâm VNVC. <br />● Tất cả các đơn đặt
        giữ vắc xin đã thanh toán thành công không <br />
        được phép hoàn huỷ với bất kỳ lý do nào. <br />● Không thực hiện giao
        hàng cho đơn đặt giữ vắc xin, mọi mũi tiêm trong đơn hàng phải được thực
        hiện tại Hệ thống trung tâm tiêm chủng VNVC. <br /> QUY ĐỊNH CHUNG{" "}
        <br />
        *** Bảng giá được áp dụng từ ngày 20/01/2021 cho đến khi có thông báo
        mới. Giá vắc xin có thể thay đổi và sẽ được thông báo chính thức trên
        các kênh truyền thông của VNVC: website chính thức vnvc.vn, website đặt
        giữ vắc xin vax.vnvc.vn và gửi văn bản đến các đối tác đặt giữ vắc xin.
        *** Giá đã bao gồm chi phí khám, tư vấn với bác sĩ.
      </Modal>

      <Modal
        visible={isModalVisible2}
        onOk={() => {
          showModal();
          handleCancel2();
        }}
        onCancel={handleCancel2}
        cancelText={"Thêm người tiêm"}
        okText={"Xem điều khoản và thanh toán"}
      >
        <p>{messageAddCustomer}</p>
      </Modal>
    </div>
  );
}

import React, { useLayoutEffect, useState } from "react";
import Header from "../../Components/header";
import StepRegister from "../../Components/StepRegister";
import Footer from "../../Components/footer";
import { instance } from "../../utils/axios";
import { useParams } from 'react-router-dom';
import { tongTien } from "../../utils";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Confirm({ match }) {

  const { id } = useParams();

  const [data, setData] = useState({});

  useLayoutEffect(() => {
    const body = { MaDatMua: id };

    instance.post("/register/get-infor",body).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <StepRegister current={2} />
      <div>
        <div style={{display: "inline-flex"}}>
          <Container 
                    style={{
                        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '40px',
                        width: '40px'}}>
                            
          </Container>
          <h2>QUÝ KHÁCH VUI LÒNG THANH TOÁN THEO HƯỚNG DẪN BÊN DƯỚI TRƯỚC 11:03-24/04/2022 ĐỂ HOÀN TẤT ĐẶT GIỮ VẮC XIN</h2>
        </div>
        <Container 
                    style={{
                        backgroundImage: `url('https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20211119101350/ri/950/src/images/news/ImageForNews_697293_1637334825213259.jpg')`,
                        height: 250, 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'}}>
                            
      </Container>
        <h4>VNVC chỉ thực hiện giữ chỗ cho vắc xin sau khi nhận được thanh toán từ Quý khách và tổng số lượng đặt mua không vượt quá giới hạn mũi tiêm chúng tôi có thể cung cấp.</h4>
        <div>
          Mã đặt mua : {data?.MaDatMua}
        </div>

        <div>
          Số người đăng ký : {data?.NguoiTiem?.length}
        </div>

        <div>
          Tổng số tiền cần thanh toán : {tongTien(data?.NguoiTiem).toLocaleString()} VNĐ
        </div>

        <h3 style = {{fontWeight: 'bold'}}>Hướng dẫn thanh toán</h3>

        <div>
          1. Quý khách có thể thanh toán trực tiếp tại các Trung tâm VNVC trên toàn quốc (Danh sách trung tâm)
          <br />
          2. Quý khách có thể thanh toán bằng hình thức chuyển khoản như sau:
        </div>

        <div style ={{backgroundColor: '#e6e6e6', width: '500px', height: '70px', borderRadius: '5px'}}>
          Vui lòng chuyển khoản số tiền 0 VNĐ với nội dung như sau:
          <br />
          -
        </div>

        <h3 style={{fontWeight:'bold'}}>Thông tin đơn vị thụ hưởng</h3>

        <h4>Ngân hàng Vietinbank</h4>
        <li>Tên TK: Công Ty Cổ Phần Vacxin Việt Nam - Chi Nhánh Thành Phố Hồ Chí Minh</li>
        <li>STK: <span style={{color:'red'}}>110610016789</span></li>
        <li>Ngân hàng TMCP Công thương Việt Nam (Vietinbank) - Chi nhánh 2 TP.HCM</li>

        <h4>Ngân hàng MBBank</h4>
        <li>Tên TK: Công Ty Cổ Phần Vacxin Việt Nam - Chi Nhánh Thành Phố Hồ Chí Minh</li>
        <li>STK: <span style={{color:'red'}}>1031101859009</span></li>
        <li>Ngân hàng TMCP Quân Đội (MB Bank) - Chi nhánh Sở Giao Dịch 2 TP.HCM</li>

        <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
          Lưu ý: Nếu quý khách không nhận được tin nhắn xác nhận đã thanh toán từ VNC trong vòng 48 giờ (Không tính thứ 7, chủ nhật) sau khi hoàn tất quá trình chuyển khoản, vui lòng liên hệ đến 
          <span style={{color: 'orange'}}> hotline 02873006595</span> để được hỗ trợ.
        </div>

        <div style={{display: "inline-flex", paddingBottom: '10px'}}>
          <div style={{paddingRight: '20px'}}>
            <Button  variant="contained">
              CHI TIẾT ĐƠN HÀNG
            </Button>
          </div>

          <Button  variant="contained" style={{backgroundColor: "orange"}}>
            TIẾP TỤC ĐẶT HÀNG
          </Button>

        </div>
        
        <div style={{fontWeight:'bold'}}>Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ tại VNVC</div>

        <div style={{color:'orange'}}>Hotline 02873006595</div>

      </div>

      <Footer />
    </div>
  );
}

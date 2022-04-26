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
                        backgroundImage: `url('https://lh3.googleusercontent.com/lxVy5bOIPDxgRNninGHurWYQPBGpR5q2MeML-ytGdE8KmTLWbpQyntmN0_StbvAWumJVJnfq1CUb_S8V7nnHzUTXlM_2IFPYAYb8seAmoIkl1ffSvUQZoUBDOyCZF0aSq-YMp7_Wbm0KnZJ51kp-BxxHkXbZUPi674xALfWl3kXi9M0T2II0kGU4P3YGbwEJKk4bTW4bXCbSXlzfUOHWBtwRz_Oojmz_-8LbSV0CmdvPN1n5MSsbM2VgFYsevrgp7XLTF8uDMGEjO4JlGS3r4UVuSG7SbPcfzlER_hEtfVo-0hcOEzos-gYkPLzr6mbB-IWrLIl2He-3zMPl5Guv6sm_NbiNm1B-QvZDgYVs1GbmbfQi30LjKMBeR5h4TfxDMtK6aNEO7P1n90PNcqyBptYbUVSPyYySRWeVoVms6NwINXDAKpZkS26qF_H0ljy_Aw_JqrM2_ATgwRxYT1wgCS86oNATviUVqaGSV3jtG3xQ-U8izj5UXWxF59EA2LFDBwuNwLWsv2LNgkLq0iJyl1BrHoCWYF8Cun_F72L2Nbhba9gwqMndkSx_A7vl1JAlQGsVK4enHzsagWGTFwfIGidotnf0mGrSiPumRAYKjOVbeapxVGS0G3HYU_vwB4tbV0tEgt9-R0NYAxjItTKP5EvBipk809-mI7CsK0f2rPlYJLsYxuzHFS3E_LswQX85HvBzr6dOm062e6WMn2QDbgOSe_Z7j-ObbPADXT1BBNwBZzGKnmdeT3fU0CxF8vOH-qmQpK2W4JSapYTNebTOuE55YyHpfVQC5iJcSxDLKJCxr3DlWj2j53ILb4XIByOglsSP=w84-h96-no?authuser=0')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '70px',
                        width: '70px'}}>
                            
          </Container>
          <h1>QUÝ KHÁCH VUI LÒNG THANH TOÁN THEO HƯỚNG DẪN BÊN DƯỚI TRƯỚC 11:03-24/04/2022 ĐỂ HOÀN TẤT ĐẶT GIỮ VẮC XIN</h1>
        </div>
        <Container 
                    style={{
                        backgroundImage: `url('https://lh3.googleusercontent.com/I5ycvuqTUHKKnIRp-D1B-wnaEPpe10XLucXrRAzhg7xEAgPPmmnZohPqvQmuUvb_0REdohDHCrVI7HFaZmI_dHXJPj83IgmbBFjb4E11iA4RNuMZHxil-qZ3ywJJYi15gZSK_rsUfBZqImzQsNchqMXatrDwWOBUVduCYl86e5TObMNNTlNne3vh-Ij8iJbBAl2ea8hvfAlxOw4-RsC2MA92zT9QfUXdCS2FEuxWEZvvsyWp8iabmVtw5e9v-l_dHm3rStyX8RdaSBnZjQIjBQ-3H_tdi3Ln7h5YZyPlXsm7NV__6fbnvtPMz5j1Hw9-UNdmwRqseOR8K36cGHDiOlR0HrzDbs8QCVpR7cD7C-2PuP9szGcdjm1aXlP6XZMKeipLB9_GTk5NNzIVt15SHWxZjRh5SSikR4FmKdt-2aBItyaTt_-FK42rW_a3aPXjsRTvkKX2TbO6mxsG35mCM0CH1zVpTizft8EcAtm2NGn9i9LCwiiv-fjQ0HnUBqefjnOPpnXf_lvRTUhKZOlKe-CwGW48vEELI4FNVbnS-FNidwEb0BG8PRmwYhLpsyU96Qtg2pJUFi2xWJ_tAObgDKJIpGjM1nMpRcgnjnEqbZARs7Tx-Bbco_vEf52982t09wHSoNTcAK7HVB9VRuk8h8GazTGTxvviuCCm-e4BlKUsK2rY3zK8WqoFeqQyBc_QLOsr_8wzSLDiJemajoDPJOrDwfIJae4fQQx5zDTdluchDYRTlPZUBbMHWqPRJnhh6Ztizru0AhB_XWcO4oZGgJ-pjvBxSZIVlNYoGq8h8zE2m-atqm7sThbqOD9t-yMrCya2=w626-h417-no?authuser=0')`,
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

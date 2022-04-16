import React, { useLayoutEffect, useState } from "react";
import Header from "../../Components/header";
import StepRegister from "../../Components/StepRegister";
import Footer from "../../Components/footer";
import { instance } from "../../utils/axios";
import { useParams } from 'react-router-dom';
import { tongTien } from "../../utils";

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
        Mã đặt mua : {data?.MaDatMua}
      </div>

      <div>
        Số người đăng ký : {data?.NguoiTiem?.length}
      </div>

      <div>
        Tổng số tiền cần thanh toán : {tongTien(data?.NguoiTiem).toLocaleString()} VNĐ
      </div>

      <Footer />
    </div>
  );
}

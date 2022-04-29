import React, { useLayoutEffect, useState } from "react";
import Header from "../../Components/header";
import StepRegister from "../../Components/StepRegister";
import Footer from "../../Components/footer";
import { instance } from "../../utils/axios";
import { useParams } from 'react-router-dom';
import { tongTien } from "../../utils";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

export default function DetailVaccine() {
    const { id } = useParams();
    const [data, setData] = useState({});

    useLayoutEffect(() => {
        const body = { ID: id };

        instance.get(`http://localhost:5000/vaccine/${id}`,body).then((res) => {
            setData(res.data[0]);
            console.log(id);
            console.log(res.data[0]);
            console.log(res.data[0].DanhSachMuiTiem);
        });
        }, []);

    return (
        <div>
            <Header />
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={4}>
                        <div style={{border: "1px solid #0754a8", backgroundColor: "#0754a8",
                                    borderRadius: "34px",
                                    height: "400px",
                                    width: "400px",
                                    marginLeft: "60px",
                                    marginBottom: "20px"}}>
                            <h2 style={{marginLeft: "30px", color:"black"}}>{data.Ten}</h2>
                            <h1 style={{marginLeft: "30px", color:"white"}}>{data.Gia} VNĐ</h1>
                            <h4 style={{marginLeft: "30px", color:"black"}}>Phòng bệnh</h4>
                            <span style={{marginLeft: "30px", color:"white"}}>{data.PhongBenh}</span>

                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <h3 style={{color:"#0754a8"}}>MÔ TẢ THÔNG TIN VẮC XIN:  {data.Ten}</h3>
                        <p>{data.ThongTinVeVaccine}</p>
                        <h4>
                            DANH MỤC MŨI TIÊM
                        </h4>
                        {data.DanhSachMuiTiem && data.DanhSachMuiTiem.map((item) => (
                            <>
                            <p>{item.TenVaccineDon}</p>
                            <ul>
                                <li>{item.NuocSanXuat}</li>
                                <li>{item.PhongBenh}</li>
                                <li>Số mũi tiêm: {item.SoMuiTiem}</li>
                            </ul>
                            </>
                        ))
                        }
                    </Grid>
            </Grid>
            <Footer />
        </div>
    );
}

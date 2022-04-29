import OutlinedCard from "../../Components/card";
import Bill from "../../Components/bill";
import NestedList from "../../Components/list";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import axios from "axios";
import Search from "antd/lib/transfer/search";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Vaccine() {
  const [catClick, setCatClick] = useState(false);
  const [listCard, setListCard] = useState([]);
  const [searchKey, setSeachKey] = useState("");
  const [listChoose, setListChoose] = useState([]);

  const handleClick = () => {
    setCatClick(!catClick);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/vaccine").then((res) => {
      setListCard(res.data);
      setListChoose(Array(res.data.length).fill(false));
    });
    console.log(listCard);
  }, []);

  const handleChange = (event) => {
    // console.log(event.target.value);
    var searchKey2 = event.target.value;
    console.log(searchKey2);
    axios
      .get("http://localhost:5000/search", {
        params: {
          searchKey: searchKey2,
        },
      })
      .then((res) => {
        setListCard(res.data);
        // setListChoose(Array(res.data.length).fill(false));
      });
  };
  // General function
  const onItemChoose = (index) => {
    var newList = listChoose.slice();
    newList[index] = !newList[index];

    setListChoose(newList);
  };

  if (listCard.length == 0) {
    return (
      <>
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            margin: 0,
            paddingLeft: 10,
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              color: "#2a388f",
              fontWeight: "bold",
              paddingLeft: "10px",
            }}
          >
            THÔNG TIN SẢN PHẨM VACCINE
          </div>
        </Container>
        <Box sx={{ width: "100%" }} style={{ paddingLeft: "10px" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={8}>
              <div
                style={{
                  fontSize: "1.5rem",
                  color: "#2a388f",
                  fontWeight: "bold",
                  paddingTop: "300px",
                  textAlign: "center",
                }}
              >
                DANH SÁCH TRỐNG
              </div>

              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {listCard.map((value, index) => {
                  return (
                    <Grid item xs={4} key={index}>
                      <OutlinedCard
                        ma={index}
                        ten={value.Ten}
                        gia={value.Gia}
                        phongbenh={value.PhongBenh}
                        thongtin={value.ThongTinVeVaccine}
                        isChoosen={listChoose[index]}
                        onChoose={onItemChoose}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              {/* <input type="text" name="searchKey" onChange={handleChange} /> */}
              <div style={{ marginLeft: "0px", marginBottom: "30px" }}>
                <Search
                  placeholder="Tìm tên vắc xin..."
                  name="searchKey"
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <Bill listCard={listCard} listChoose={listChoose} />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            margin: 0,
            paddingLeft: 10,
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              color: "#2a388f",
              fontWeight: "bold",
              paddingLeft: "10px",
            }}
          >
            THÔNG TIN SẢN PHẨM VACCINE
          </div>
        </Container>
        <Box sx={{ width: "100%" }} style={{ paddingLeft: "10px" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={8}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {listCard.map((value, index) => {
                  return (
                    <Grid item xs={4} key={index}>
                      <OutlinedCard
                        ma={index}
                        ten={value.Ten}
                        gia={value.Gia}
                        maVaccine={value.MaVaccine}
                        phongbenh={value.PhongBenh}
                        thongtin={value.ThongTinVeVaccine}
                        isChoosen={listChoose[index]}
                        onChoose={onItemChoose}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              {/* <input type="text" name="searchKey" onChange={handleChange} /> */}
              <div style={{ marginLeft: "0px", marginBottom: "30px" }}>
                <Search
                  placeholder="Tìm tên vắc xin..."
                  name="searchKey"
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <Bill listCard={listCard} listChoose={listChoose} />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

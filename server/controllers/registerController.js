const KhachHang = require("../models/KhachHang");

const insert = (req, res) => {
  const khachHang = KhachHang({
    MaKhachHang_VNVC: "aaaa",
    HoTen: "Test",
    NgayThangNamSinh: "1999-12-20",
    GioiTinh: "Nam",
    Email: "test@gmail.com",
    SoNha: "sdfsdfsdfsdf",
    Tinh_Thanh: "asasa",
    Phuong_Xa: "dssdsd",
    Quan_Huyen: "asasas",
    SDT: "123456789",
  });

  khachHang
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { insert };

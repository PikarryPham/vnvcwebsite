const KhachHang = require("../models/KhachHang")
const moment = require("moment")

const GetCustomer = (req, res) => {

  const MaKhachHang_VNVC = req.body.MaKhachHang_VNVC;
  const NgayThangNamSinh = moment(req.body.NgayThangNamSinh).format('YYYY-MM-DD');
 
  KhachHang.find({MaKhachHang_VNVC,NgayThangNamSinh}, function (err, docs) {
    res.send(docs[0]);
  });
};

module.exports = {
    GetCustomer,
};
const KhachHang = require("../models/KhachHang");
const ThongTinChiTietDangKyTiem = require("../models/ThongTinChiTietDangKyTiem");
const ThongTinDangKyTiem = require("../models/ThongTinDangKyTiem");

const { v4: uuidv4 } = require("uuid");
const moment = require("moment")
const client = require("../redis")



const addInfor = (req, res) => {
  let customers = req.body.nguoitiem;
  let nguoiMua = req.body.nguoimua;

  

  //thêm mã khách
  let customers2 = [];
  for (const iterator of customers) {

    iterator.NgayThangNamSinh = moment(iterator.NgayThangNamSinh).format('YYYY-MM-DD');
    customers2.push({
      MaKhachHang_VNVC: uuidv4(),
      ...iterator,
    });
  }
  KhachHang.insertMany(customers2)
    .then((docs) => {
      //console.log(docs);
    })
    .catch((err) => {
      //console.log(err);
    });

  //insert to redis customer
  for (const iterator of customers2) {
    client.setex(
      "KhachHang-" + iterator.MaKhachHang_VNVC,
      3600,
      JSON.stringify(iterator)
    );
  }

  //thêm vào bảng ThongTinChiTietDangKyTiem
  const maDatMua = uuidv4();
  let thongTinNguoiTiem = {};
  thongTinNguoiTiem["MaDatMua"] = maDatMua;
  let nguoiTiems = [];
  for (const customer of customers2) {
    nguoiTiems.push({
      TrungTamVNVC: customer.TrungTamVNVC,
      KhachHang: {
        IDKhachHang: customer.MaKhachHang_VNVC,
        TenKhachHang: customer.HoTen,
        MoiQuanHe: customer.MoiQuanHe,
      },
      NgayMongMuonTiem:moment(customer.NgayMongMuonTiem).format('YYYY-MM-DD'),
      vaccine: customer.vaccine,
    });
  }

  thongTinNguoiTiem["NguoiTiem"] = nguoiTiems;
  
  const thongTinChiTietDangKyTiem =
    ThongTinChiTietDangKyTiem(thongTinNguoiTiem);

  thongTinChiTietDangKyTiem
    .save()
    .then((result) => {
      //console.log(result);
    })
    .catch((err) => {
      //console.log(err);
    });

  client.setex(
    "ThongTinChiTietDangKyTiem-" + maDatMua,
    3600,
    JSON.stringify(thongTinNguoiTiem)
  );

  //thêm vào bảng ThongTinDangKyTiem
  //console.log(nguoiMua)

  thongTinDangKyTiem = ThongTinDangKyTiem({
    MaDatMua: maDatMua,
    ...nguoiMua,
  });

  thongTinDangKyTiem.save();

  client.setex(
    "ThongTinDangKyTiem-" + maDatMua,
    3600,
    JSON.stringify({
      MaDatMua: maDatMua,
      ...nguoiMua,
    })
  );

  res.send({
    id: maDatMua,
  });
};

const getInfor = (req, res) => {
  let MaDatMua = req.body.MaDatMua;

  ThongTinChiTietDangKyTiem.find(
    { MaDatMua },
    function (err, thongTinChiTietDangKyTiem) {
      if (err) {
        res.send(err);
      }

      res.send(thongTinChiTietDangKyTiem[0])
    }
  );
};

module.exports = {
  addInfor,
  getInfor,
};

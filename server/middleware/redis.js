const { v4: uuidv4 } = require("uuid");

const client = require("../redis");
const moment = require("moment");

//Middleware Function to Check Cache
checkCache = (req, res, next) => {
  if (req.path == "/get-customer") {
    let MaKhachHang_VNVC = req.body.MaKhachHang_VNVC;
    const NgayThangNamSinh = moment(req.body.NgayThangNamSinh).format(
      "YYYY-MM-DD"
    );

    client.get("KhachHang-" + MaKhachHang_VNVC, (err, data) => {
      if (err) {
        res.status(500);
      }
      //if no match found
      if (data != null) {
        let customer = JSON.parse(data);

        if (customer.NgayThangNamSinh == NgayThangNamSinh) {
          res.send(customer);
        } else {
          next();
        }
      } else {
        //proceed to next middleware function
        next();
      }
    });
  } else if (req.path == "/get-infor") {
    let MaDatMua = req.body.MaDatMua;

    client.get("ThongTinChiTietDangKyTiem-" + MaDatMua, (err, data) => {
      if (err) {
        res.status(500);
      }
      //if no match found
      if (data != null) {
        let customer = JSON.parse(data);

        res.send(customer);
      } else {
        //proceed to next middleware function
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = checkCache;

const KhachHang = require("../models/KhachHang");
const Vaccine = require("../models/Vaccines");

const { v4: uuidv4 } = require("uuid");

const { Types } = require("mongoose");

const insertKhachHang = (req, res) => {
  const khachHang = KhachHang({
    _id: new Types.ObjectId(),
    MaKhachHang_VNVC: uuidv4(),
    ...req.body,
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

const addInfor = (req, res) => {
  let customers = req.body.customers;

  //console.log(customers[0].ListVaccines)

  //customer2 = clone customers + field _id
  let customers2 = [];
  let customerIds = []
  for (const iterator of customers) {
    const temp = new Types.ObjectId();
    customerIds.push(temp)
    
    customers2.push({
      _id:temp,
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

  

  /**HoTen: 'zzxasdasxdd',
NgayThangNamSinh: '2022-03-16T17:39:09.936Z',
GioiTinh: 'Nữ',
SDT: '2534258896',
    MoiQuanHe: 'Mẹ',
Email: 'nntu079@gmail.com',
SoNha: 'sdsdsdsd',
Tinh_Thanh: 'Nam',
Quan_Huyen: 'Nữ',
Phuong_Xa: 'Nam',
    DiaDiemTiem: 'Nam',
    TrungTamVNVC: 'Nam'
   * 
   */
};

const ListVaccines = (req, res) => {
  Vaccine.find({}, function (err, vaccines) {
    res.send(vaccines);
  });
};

module.exports = {
  insertKhachHang,
  addInfor,
  ListVaccines,
};

/**
 * db('DATH').collection('Vaccines').insertOne({
    MaVacXin:"Test 2",
    LoaiVacXin:"GoiVaccine",
    Ten:"Test 3",
    Gia:14000000,
    PhongBenh:"Test 1",
    ThongTinVeVacXin:"Test 54",
    TongSoLieu:15})
})
 */

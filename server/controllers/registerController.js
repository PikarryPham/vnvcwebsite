const KhachHang = require("../models/KhachHang");
const { v4: uuidv4 } = require('uuid');

const { Types } = require("mongoose");

const insertKhachHang = (req, res) => {

  const khachHang = KhachHang({
    "_id": new Types.ObjectId(),
    MaKhachHang_VNVC: uuidv4(),
    ...req.body
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

const addInfor = (req,res)=>{

  let customers = req.body.customers
  let customers2 = []
  for (const iterator of customers) {
    customers2.push({
      _id:new Types.ObjectId(),
      MaKhachHang_VNVC: uuidv4(),
      ...iterator
    })
  }

  let customers3 = []
  for (const iterator of customers2) {
    let iterator3 = {...iterator}

    delete iterator3.MoiQuanHe
    delete iterator3.DiaDiemTiem
    delete iterator3.TrungTamVNVC
    customers3.push(iterator3)
  }

  KhachHang.insertMany(customers3).then( (docs)=>{
    console.log(docs)
  } ).catch((err) => {
    console.log(err)
  })

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
}

module.exports = { insertKhachHang,addInfor };
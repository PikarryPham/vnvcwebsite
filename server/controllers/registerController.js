const KhachHang = require("../models/KhachHang");
const { v4: uuidv4 } = require('uuid');

const { Types } = require("mongoose");

const insertKhachHang = (req, res) => {

  console.log()

  
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

module.exports = { insertKhachHang };

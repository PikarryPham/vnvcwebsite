const DiaChiVN = require("../models/DiaChiVN");

const ListProvince = (req, res) => {
  
  DiaChiVN.find({},{Tinh_Thanh:1, _id:0}, function (err, docs) {
  
    let listProvince = []
    for (const iterator of docs) {
        if(iterator.Tinh_Thanh){
          listProvince.push(iterator.Tinh_Thanh)
        }
    }
    let uniq = [...new Set(listProvince)];
    res.send(uniq);
  });

};

const ListDistrict = (req,res)=>{

  let Tinh_Thanh = req.body.Tinh_Thanh

  DiaChiVN.find({Tinh_Thanh},{Quan_Huyen:1, _id:0}, function (err, docs) {
  
    let listProvince = []
    for (const iterator of docs) {
        if(iterator.Quan_Huyen){
          listProvince.push(iterator.Quan_Huyen)
        }
    }
    let uniq = [...new Set(listProvince)];
    res.send(uniq);
  });
}

const ListCommune= (req,res)=>{
  let Tinh_Thanh = req.body.Tinh_Thanh
  let Quan_Huyen = req.body.Quan_Huyen

  DiaChiVN.find({Tinh_Thanh,Quan_Huyen},{Phuong_Xa:1, _id:0}, function (err, docs) {
  
    let listProvince = []
    for (const iterator of docs) {
        if(iterator.Phuong_Xa){
          listProvince.push(iterator.Phuong_Xa)
        }
    }
    let uniq = [...new Set(listProvince)];
    res.send(uniq);
  });
}

module.exports = {
  ListProvince,
  ListDistrict,
  ListCommune
};

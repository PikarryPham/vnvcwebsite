const TrungTam = require("../models/TrungTamVNVC");
const Vaccine = require("../models/Vaccines");

// const search = (req, res) => {
//   console.log("noi dung 1");
//   console.log("~~~", req.query);
// };
const search = function (req, res) {
  console.log("~~abc");
  Vaccine.find({}, function (err, vaccines) {
    res.send(vaccines);
  });
};

const ListVaccineCenter = (req, res) => {
  const province = req.body.Tinh_Thanh;

  TrungTam.find({ Tinh_Thanh: province }, function (err, docs) {
    res.send(docs);
  });
};

const ListProvince = (req, res) => {
  TrungTam.find({}, { Tinh_Thanh: 1, _id: 0 }, function (err, docs) {
    let listProvince = [];
    for (const iterator of docs) {
      if (iterator.Tinh_Thanh) {
        listProvince.push(iterator.Tinh_Thanh);
      }
    }
    let uniq = [...new Set(listProvince)];
    res.send(uniq);
  });
};

const ListVaccines = (req, res) => {
  Vaccine.find({}, function (err, vaccines) {
    res.send(vaccines);
  });
};

const listVaccine = async function (req, res) {
  Vaccine.find({}, function (err, vaccines) {
    res.send(vaccines);
  });
};

const detailVaccine = async function (req, res) {
  Vaccine.find({ MaVacXin: { $eq: req.params.ID } }, function (err, vaccines) {
    res.send(vaccines);
  });
};

module.exports = {
  ListVaccineCenter,
  ListProvince,
  ListVaccines,
  listVaccine,
  detailVaccine,
  search,
};

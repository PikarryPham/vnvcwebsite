const Vaccine = require("../models/Vaccines");

const search = function (req, res) {
  // console.log("~~abc");
  // console.log(req.query.searchKey);
  var search = req.query.searchKey;

  Vaccine.find(
    // { Ten: { $regex: /${req.query.searchKey}/, $options: "i" } },
    { Ten: new RegExp(search, "i") },
    function (err, vaccines) {
      // console.log("err", err);
      // console.log("vaccines:", vaccines);
      res.send(vaccines);
    }
  );
};

module.exports = {
  search,
};

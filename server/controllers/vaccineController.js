const Vaccine = require("../models/Vaccines");

const listVaccine = async function (req, res) {
    Vaccine.find({}, function (err, vaccines) {
        res.send(vaccines);
    });
};

const detailVaccine = async function (req, res) {
    Vaccine.find({'MaVacXin': {$eq: req.params.ID}}, function (err, vaccines) {
        res.send(vaccines);
    });
};

module.exports = {
    listVaccine,
    detailVaccine,
};
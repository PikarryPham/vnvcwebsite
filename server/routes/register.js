const express = require("express");

const registerController = require("../controllers/registerController");
const diachiController = require("../controllers/diachiController");
const vaccineController = require("../controllers/vaccineController");
const customerController = require("../controllers/customerController");

const checkCache = require("../middleware/redis");

const router = express.Router();

router.post("/add-infor", registerController.addInfor);
router.post("/get-infor", checkCache, registerController.getInfor);

router.post("/get-province", diachiController.ListProvince);
router.post("/get-district", diachiController.ListDistrict);
router.post("/get-commune", diachiController.ListCommune);

router.post("/get-vaccine-center", vaccineController.ListVaccineCenter);
router.post("/get-vaccine-province", vaccineController.ListProvince);
router.post("/get-vaccines", vaccineController.ListVaccines);

router.post("/get-customer", checkCache, customerController.GetCustomer);

module.exports = router;

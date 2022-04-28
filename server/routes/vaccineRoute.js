const express = require("express");
const router = express.Router();
const vaccineController = require("../controllers/vaccineController");

router.get("/", vaccineController.listVaccine);

router.get("/:ID", vaccineController.detailVaccine);
router.get("/search/{searchKey}", vaccineController.search);

module.exports = router;

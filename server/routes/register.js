const express = require('express');
const registerController = require('../controllers/registerController');

const router = express.Router();

router.post('/insert-khachhang', registerController.insertKhachHang);
router.post('/add-infor',registerController.addInfor)
router.post('/get-vaccines',registerController.ListVaccines)

module.exports = router;
const express = require('express');
const registerController = require('../controllers/registerController');

const router = express.Router();

router.post('/insert-khachhang', registerController.insertKhachHang);

module.exports = router;
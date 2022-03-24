const express = require('express');
const registerController = require('../controllers/registerController');

const router = express.Router();

router.use('/insert', registerController.insert);


module.exports = router;
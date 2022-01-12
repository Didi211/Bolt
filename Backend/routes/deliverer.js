const express = require("express");
const router = express.Router();

const { CreateDeliverer, GetDelivererByID }= require('../controllers/delivererController');

router.get('/get/:id',GetDelivererByID);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
    CreateStore,
    GetStore,
    GetAllStores
} = require('../controllers/storeController');


router.post('/create', CreateStore);
router.get('/get/:id', GetStore);
router.get('/all', GetAllStores);

module.exports = router;
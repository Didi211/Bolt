const express = require("express");
const router = express.Router();

const {
    CreateStore,
    GetStore,
    GetAllStores,
    changePrepTime
} = require('../controllers/storeController');


router.post('/create', CreateStore);
router.get('/get/:id', GetStore);
router.get('/all', GetAllStores);
router.put('/preptime/change/:id',changePrepTime)

module.exports = router;
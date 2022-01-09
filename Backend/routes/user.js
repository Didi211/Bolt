const express = require("express");
const router = express.Router();

const {CreateUser, GetUser} = require('../controllers/userController');


router.post('/',CreateUser); 
router.get('/:id',GetUser)

module.exports = router;
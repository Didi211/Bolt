const express = require("express");
const router = express.Router()

const {CreateOrder,AcceptOrderRestaraunt,GetAcceptedDeliverer,GetReadyStore,GetAcceptedStore,GetPendingStore,OrderFinished,OrderPickedUp,OrderReady,AcceptOrderDeliverer,DeclineOrderRestaraunt} = require('../controllers/orderController');


router.post('/',CreateOrder); 

router.post('/acceptStore',AcceptOrderRestaraunt); 
router.post('/acceptDeliverer',AcceptOrderDeliverer); 
router.post('/decline',DeclineOrderRestaraunt); 
router.post('/finished',OrderFinished); 
router.post('/pickedUp',OrderPickedUp); 
router.post('/ready',OrderReady); 

router.get('/readyOrders/:storeID',GetReadyStore); 
router.get('/acceptedDeliverer/:delivererID',GetAcceptedDeliverer); 
router.get('/accpetedStore/:storeID',GetAcceptedStore); 
router.get('/pending/:storeID',GetPendingStore); 






module.exports = router;
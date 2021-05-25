const express = require('express');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');
const { createOrder,getSingleOrder,getAllOrders,myOrders,updateOrder,deleteOrder }  = require('../controllers/orderController');


router.route('/order/new').post(isAuthenticatedUser,createOrder);

router.route('/orders/all').get(isAuthenticatedUser,authorizeRoles('admin'),getAllOrders);

router.route('/orders/user').get(isAuthenticatedUser,myOrders);

router.route('/order/:id')
                    .get(isAuthenticatedUser,authorizeRoles('admin'),getSingleOrder)
                    .put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder)
                    .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder)
                    

module.exports =  router;
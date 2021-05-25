const express = require('express');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');
const { processPayment,sendStripiApi }  = require('../controllers/paymentController');


router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripiApi);

module.exports = router;

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const stripe =  require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.processPayment = catchAsyncErrors(async (req, res,next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'mxn',
        metadata: { integration_check: 'accept_a_payment'}
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

// Send Stripe Key
exports.sendStripiApi = catchAsyncErrors(async (req, res,next) => {
    
    res.status(200).json({
      stripeKey: process.env.STRIPE_API_KEY
    })
})
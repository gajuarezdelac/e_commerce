const OrderModel = require('../models/orderModel');
const ProductModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// Crrate a new order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
    
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await OrderModel.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    });

    res.status(200).json({
            success: true,
            order
        });

})

exports.getSingleOrder = catchAsyncErrors(async (req, res,next) => {
    
   const order = await  OrderModel.findById(req.params.id).populate('user','name email')
   
   if(!order) return next(ErrorHandler('No order found', 404));

   return res.status(200).json({
       success: true,
       order
   })
})

exports.myOrders = catchAsyncErrors(async (req, res,next) => {

    const orders = await OrderModel.find({user: req.user.id})
    
    return res.status(200).json({
        success: true,
        orders
    })

})

// Get all orders => /api/v1/orders
exports.getAllOrders = catchAsyncErrors(async (req, res,next) => {

    const orders = await OrderModel.find().populate('user','name email');

    let totalMount = 0;

    orders.forEach(order => {
        totalMount += order.totalPrice
    })

     return res.status(200).json({
    success: true,
    cant: orders.length,
    orders,
    totalMount
    })
})


// Update / Process order - ADMIN => /api/v1/orders
exports.updateOrder  = catchAsyncErrors(async (req, res,next) => {

    const order = await OrderModel.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

     await order.save()

     res.status(200).json({
    success: true,
    })
})

async function updateStock(id, quantity) {
    const product = await ProductModel.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}


// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})
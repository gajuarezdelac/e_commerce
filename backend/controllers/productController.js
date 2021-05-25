const ProductModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

// Images!!!!
const cloudinary = require('cloudinary');


// Create a new product =>  {{DOMAIN}}/api/v1/admin/product/new
exports.createProduct = catchAsyncError(async (req, res, next) => {

   let images = [];

   if(typeof req.body.images === 'string') {
       images.push(req.body.images);
   }else {
       images = req.body.images;
   }


   let imagesLink = [];

   // Push images
   for(let i = 0; i < images.length; i++) {
       const result = await cloudinary.v2.uploader.upload(images[i],{
           folder: 'products',
       })

       imagesLink.push({
           public_id: result.public_id,
           url: result.secure_url
       })
   }

    req.body.images = imagesLink;
    req.body.user = req.user.id;
    const product = await ProductModel.create(req.body)

    res.status(200).json({
     success: true,
     product
    });

})

// Get All product => {{DOMAIN}}/api/v1/product
exports.getProducts = catchAsyncError(async (req, res, next) => {

    const resPerPage = 8;
    const productCount = await ProductModel.countDocuments();

    const apiFeatures = new ApiFeatures(ProductModel.find(),req.query)
                             .search()
                             .filter()
                            //  .pagination(resPerPage)
    
            let products = await apiFeatures.query;
            let filteredProductsCount = products.length;
       
            apiFeatures.pagination(resPerPage)
            products = await apiFeatures.query;

        res.status(200).json({
            success: true,
            resPerPage,
            productCount,
            filteredProductsCount,
            products
        });

})


// Get All product => {{DOMAIN}}/api/v1/product
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {

    const products = await ProductModel.find();

        res.status(200).json({
            success: true, 
            products
        });

})

// Get single product details => {{DOMAIN}}/api/v1/product/6099cef67053da41a03936c5
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {

    const product = await ProductModel.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    
    res.status(200).json({
        success: true,
        product
    }); 
})


// Ipdate a product =>  {{DOMAIN}}/api/v1/admin/product/6099cef67053da41a03936c5
exports.updateProduct = catchAsyncError(async (req, res, next) => {
 
    let product = await ProductModel.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    let images = [];

    if(typeof req.body.images === 'string') {
        images.push(req.body.images);
    }else {
        images = req.body.images;
    }

    if(images !== undefined) {   
        
        // destroy images associated with the product
        for(let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        let imagesLink = [];
 
        // Push images
        for(let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i],{
                folder: 'products',
            })
     
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        
         req.body.images = imagesLink;
    }
     
    product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

})

// Delete Product => {{DOMAIN}}/api/v1/admin/product/:id

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    
    const product = await ProductModel.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    for(let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    
    await product.remove();

    res.status(200).json({
        success: true,
        msg: "Product is deleted"
    });
})


// CREATE a new review
exports.createProductReview = catchAsyncError( async (req, res, next) => {
    
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await ProductModel.findById(productId);
    
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

   
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })


})

exports.getProductsReviews = catchAsyncError( async (req, res, next) => {

    const product = await ProductModel.findById(req.query.id);
    
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })

})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {

    const product = await ProductModel.findById(req.query.productId);
    
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await ProductModel.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})
 

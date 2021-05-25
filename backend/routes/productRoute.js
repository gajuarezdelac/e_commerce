const express = require('express');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');
const { 
    getProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductsReviews,
    deleteReview,
    getAdminProducts
}  = require('../controllers/productController');

router.route('/product').get(getProducts);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts)

router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),createProduct);

router.route('/admin/product/:id')
         .put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
         .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);
         
router.route('/review').put(isAuthenticatedUser,createProductReview);
      
router.route('/reviews')
                 .get(isAuthenticatedUser,getProductsReviews)
                 .delete(isAuthenticatedUser,deleteReview)   

module.exports = router;
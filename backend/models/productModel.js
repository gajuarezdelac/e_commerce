const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxLength: [100, 'Max length is 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Prcie is required'],
        maxLength: [100, 'Max length is 5 '],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    ratings: {
       type: Number,
       default: 0,
    },
    images: [{
        public_id :{
            type: String,
            required: [true, 'PublicId is required']
        },
        url: {
            type: String,
            required: [true, 'Url is required']
        }
    }],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: ['Electronics','Cameras','Laptops','Accessories','Headphones','Food','Books','Clothes/shoes','Beauty/Healt', 'Sports', 'Outdoor','Home'],
            message: 'Please select an category'
        }
    },
    seller: {
        type: String,
        required: [true, 'Seller is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        maxLength: [5, 'Max length is 5'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports  = mongoose.model('Product', productSchema);


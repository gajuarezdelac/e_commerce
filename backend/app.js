const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path');

// Images
const bodyParser = require('body-parser');
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Import all routes 

const payments = require('./routes/paymentRoute');
const products = require('./routes/productRoute');
const orders = require('./routes/orderRoute');
const auth = require('./routes/authRoute');


app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1',orders);
app.use('/api/v1',payments);

// Config Production

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
// Middleware to handle errors
app.use(errorMiddleware);


module.exports = app;
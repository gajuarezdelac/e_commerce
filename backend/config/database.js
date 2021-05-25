const mongoose = require('mongoose');


const connectedDB = () => {
mongoose.connect(process.env.MONGODB_URL,{
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(con =>{
    console.log('Connected to MONGO DB');
  });
}

module.exports = connectedDB
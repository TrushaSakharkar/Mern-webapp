const mongoose = require('mongoose');

let Customer = new mongoose.Schema({
    username: {
        type: String
    },
    vendor:{
        type: String
    },
    product : {
        type: String
    },
    quantity: {
        type: Number
    },
    rating:{
        type:Number
    },
    review:{
        type:String
    }
});

module.exports = mongoose.model('Customer', Customer);

const mongoose = require('mongoose');

let Newproduct = new mongoose.Schema({
    username: {
        type: String
    },
    name : {
        type: String
    },
    price : {
        type: String
    },
    quantity: {
        type: String
    },
    curr_quantity: {
        type: Number
    },
    dispatched: {
        type: Boolean
    },
    cancel: {
        type: Boolean
    }
});

module.exports = mongoose.model('Newproduct', Newproduct);
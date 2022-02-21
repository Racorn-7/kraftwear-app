const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    addName:{
        type: String,
        required: true,
        default: 'Address'
    },
    addLineOne:{
        type: String,
        required: true,
        default: ''
    },
    city: {
        type: String,
        required: true,
        default: ''
    },
    postCode:{
        type: String,
        required: true,
        default: ''
    },
    billing: {
        type: Boolean,
        required: true,
        default: true
    },
    deliver: {
        type: Boolean,
        required: true,
        default: true
    },
});

module.exports = addressSchema;
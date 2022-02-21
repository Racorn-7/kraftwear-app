const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    payMethodName:{
        type: String,
        required: true,
        default: "Payment Method"
    },
    nameOnCard:{
        type: String,
        required: true
    },
    cardNo:{
        type: String,
        min: 16,
        max: 19,
        required: true
    },
    cardType:{
        type: String,
        required: true,
        default: 'visa'
    }
});

module.exports = paymentSchema;
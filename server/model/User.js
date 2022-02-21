const mongoose = require('mongoose');

const designSchema = require('./DesignSchema');
const orderSchema = require('./OrderSchema');
const cartSchema = require('./CartSchema');
const addressSchema = require('./AddressSchema');
const paymentSchema = require('./PaymentMethodSchema')

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    min: 1,
    max: 30
  },
  lname: {
    type: String,
    required: true,
    min: 1,
    max: 30
  },
  //TESTING
  usertype: {
    type: String,
    enum: [
      "customer",
      "artist",
      "operator",
      "supervisor",
    ]
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  cart: {
    type: cartSchema,
    default: {
      items: [],
      status: "Active"
    }
  },
  designs: {
    type: [designSchema],
    default: []
  },
  rentedDesigns: {
    type: [String],//change to artDesignSchema ID
    default: []
  },
  orders: {
    type: [{type: Schema.Types.ObjectId, ref: 'Order'}],//change to order id
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  },
  address: {
    type: [addressSchema],
    default: []
  },
  payMethod: {
    type: [paymentSchema],
    default: []
  }
});

//let Order = mongoose.model('Order', orderSchema);
module.exports = mongoose.model('User', userSchema);
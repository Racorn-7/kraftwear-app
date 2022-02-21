const mongoose = require('mongoose');
const productLineSchema = require('./ProductLineSchema');

const orderSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    default: "New Order"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  placed: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: [
      "Paid For",
      "In Progress",
      "In Transit",
      "Completed",
      "Cancelled",
    ],
    default: "Paid For"
  },
  productLines: {
    type: [productLineSchema],
    default: []
  },
  productTotal: {
    type: Number,
    required: true,
    default: 0
  },
  deliveryCost: {
    type: Number,
    required: true,
    default: 0
  },
  deliveryRef: {
    type: String
  }
});

module.exports = orderSchema;

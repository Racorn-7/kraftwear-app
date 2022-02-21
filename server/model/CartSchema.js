const mongoose = require('mongoose');
const productLineSchema = require('./ProductLineSchema');

const cartSchema = new mongoose.Schema({
  items: [productLineSchema],
  status: String
});

module.exports = cartSchema;
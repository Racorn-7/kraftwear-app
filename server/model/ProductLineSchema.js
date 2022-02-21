const mongoose = require('mongoose');
const productTypeSchema = require('./ProductTypeSchema');
//const designSchema = require('./DesignSchema');

const productLineSchema = new mongoose.Schema({

  productType: {
    type: productTypeSchema,
    required: true
  },
  size: {
    type: String,
    enum: [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    required: true
  },
  design: {
    type: String,
    required: true
  },
  garmentType: {
    type: String,
    enum: [
      "Guildan cotton",
      "Guildan silk",
      "Fruity cotton",
      "Fruity heavy"
    ],
    required: true
  },
  color: {
    type: String,
    enum: [
      "black",
      "white",
      "red",
      "grey",
      "orange",
      "brown",
      "green",
      "blue",
      "yellow",
      "pink",
    ],
    required: true
  },
  qtty: {
    type: String,
    required: true
  },

});

//const Design = mongoose.model('Design', designSchema);

module.exports = productLineSchema;


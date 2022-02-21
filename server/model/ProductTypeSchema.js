const mongoose = require('mongoose');

//TODO use this schema instead of Sting value for productType
const productTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      't-shirt female',
      't-shirt male',
      'hoodie female',
      'hoodie male',
      'v-neck female',
      'v-neck male',
      'sweater female',
      'sweater male',
    ],
    required: true
  },
  price: {
    type: Number,
    default: function () {
      switch (this.name) {
        case 't-shirt female':
        case 't-shirt male':
          return 20
        case 'hoodie female':
          return 40
        case 'hoodie male':
          return 45
        case 'v-neck female':
        case 'v-neck male':
          return 25
        case 'sweater female':
          return 30
        case 'sweater male':
          return 35
        default:
          return 20
      }
    }
  }
});

module.exports = productTypeSchema;
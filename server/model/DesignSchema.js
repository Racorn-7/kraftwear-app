const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    default: "New Design"
  },
  garmentColor: {
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
    ]
  },
  garmentTypeName: {
    type: String,
    default: null
  },
  images: {
    type: [String],
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = designSchema;
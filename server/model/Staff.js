const mongoose = require('mongoose');
//const orderSchema = require('./OrderSchema');
const Schema = mongoose.Schema;

const staffSchema = new mongoose.Schema({
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
  /*
  usertype: {
    type: String,
    enum: [
      "customer",
      "artist",
      "operator",
      "supervisor",
    ]
  },
  */
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
  supervisor: {
    type: {type: Schema.Types.ObjectId, ref: 'Staff'}//TODO
  },
  jobs: {
    type: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//const Order = mongoose.model('Order', orderSchema);

module.exports = mongoose.model('Staff', staffSchema);
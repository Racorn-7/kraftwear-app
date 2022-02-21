const router = require('express').Router();
const mongoose = require('mongoose');
const verify = require('../verification/verifyToken');
const User = require('../model/User');
const Staff = require('../model/Staff');
const OrderSchema = require('../model/OrderSchema');
const Order = mongoose.model('Order', OrderSchema);

//Assume that correct security code is 123
const CORRECT_SECURITY_CODE = "123"

//find staff with least jobs
const findOneWithLeastJobs = (items) => {
  return (
    items.reduce((acc, val) => {
      acc[0] = (acc[0] === undefined || val.jobs.length < acc[0].jobs.length) ? val : acc[0]
      return acc;
    }, [])[0]
  )
};

//payment
router.post('/', verify, async (req, res) => {
  //get user with given id
  await User.findOne({ _id: req.user._id }, async function (err, user) {
    if (err) console.log(err);
    if (user) {
      try {
        if (req.body.paymentDetails.secCode == CORRECT_SECURITY_CODE) {
          //1. create new order, add user._id to user reference   
          //2. assign operator to order
          //get the operators as array
          //then get the one with the lowest number of jobs
          const operators = await Staff.find({});
          const leastBusyOp = findOneWithLeastJobs(operators);
          //myOrder.operator = mongoose.Types.ObjectId(leastBusyOp._id);

          const myOrder = new Order({
            user: user._id,
            productLines: req.body.paymentDetails.productLines,
            productTotal: req.body.paymentDetails.productTotal,
            operator: leastBusyOp,
            deliveryCost: req.body.paymentDetails.deliveryCost
          });
          myOrder.name = "ORDER#" + myOrder._id.toString().slice(-4);
                 

          myOrder.save(function (err) {
            if (err) {
              console.log(err);
              res.status(400).send({ error: 'Failed' });
            }
          })

          //3. save order id to user.orders and staff.jobs
          leastBusyOp.jobs.push(myOrder._id);
          leastBusyOp.save(function (err) {
            if (err) {
              console.log(err);
              res.status(400).send({ error: 'Failed' });
            }
          });
          user.orders.push(myOrder._id);
          //4. empty cart
          user.cart = {};
          user.save(function (err) {
            if (err) {
              console.log(err);
              res.status(400).send({ error: 'Failed' });
            }
          })

          //5. send success message - Order number?
          res.send({ success: `Order id: ${myOrder._id}` })
        }
        else {
          res.send({ error: "Declined" });
        }
      } catch (err) {
        console.log("error: ", err);
      }
    }
    else
      res.status(400).send({ error: 'Failed' });
  });
});

module.exports = router;
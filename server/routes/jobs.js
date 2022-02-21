const router = require('express').Router();
const mongoose = require('mongoose');
const Staff = require('../model/Staff');
const orderSchema = require('../model/OrderSchema');
const Order = mongoose.model('Order', orderSchema);
const verify = require('../verification/verifyToken');

//fetch all jobs that are assigned to given staff
router.post('/my-jobs', verify, async (req, res) => {
  await Staff.findOne({ _id: req.user._id })
    .populate('jobs').exec((err, user) => {
      if (!err) {
        res.status(200).send(user.jobs);
      }
      else {
        res.status(400).send({ error: "Failed" });
      }
    });
})

//update job status
router.post('/update-job-status', verify, async (req, res) => {
  await Staff.findOne({ _id: req.user._id }, async function (err, user) {
    if (err) console.log(err);
    if (user) {
      try {
        //1. find and update order (with order._id == req.body.id)
        await Order.findOne({ _id: req.body.id }, async function (err, order) {
          if (err) res.send({ error: "Couldn't update order!" });
          else if (order) {
            //update
            order.status = req.body.newValue;
            order.save(function (err) {
              if (err) {
                console.log(err);
                
                res.status(400).send({ error: 'Failed at order save' });
              }
              else{

              Staff.findOne({ _id: req.user._id })
                .populate('jobs').exec((err, user) => {
                  if (!err) {
                    console.log("order status updated");
                    res.status(200).send(user.jobs);
                  }
                  else {
                    res.status(400).send({ error: "Failed at staff jobs save" });
                  }
                });
              }
            })
          }
        });


      } catch (err) {
        console.log("error: ", err);
        res.status(400).send({ error: 'Failed 1' });
      }
    }
    else
      res.status(400).send({ error: 'Failed 2' });
  })
})

//update job status
router.post('/book-delivery', verify, async (req, res) => {
  await Staff.findOne({ _id: req.user._id }, async function (err, user) {
    if (err) console.log(err);
    if (user) {
      try {
        //1. find and update order (with order._id == req.body.id)
        await Order.findOne({ _id: req.body.id }, async function (err, order) {
          if (err) res.send({ error: "Couldn't find order!" });
          else if (order) {

            order.deliveryRef = `UPS ${(new Date()).getTime().toString(16)}`;
            order.status = "In Transit";

            order.save(function (err) {
              if (err) {
                console.log(err);
                res.status(400).send({ error: 'Failed at order save' });
              }
              else{

              Staff.findOne({ _id: req.user._id })
                .populate('jobs').exec((err, user) => {
                  if (!err) {
                    console.log("order status updated");
                    res.status(200).send(user.jobs);
                  }
                  else {
                    res.status(400).send({ error: "Failed at staff jobs save" });
                  }
                });
              }
            })
          }
        });


      } catch (err) {
        console.log("error: ", err);
        res.status(400).send({ error: 'Failed 1' });
      }
    }
    else
      res.status(400).send({ error: 'Failed 2' });
  })
})

module.exports = router;
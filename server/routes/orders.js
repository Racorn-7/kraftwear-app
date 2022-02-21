const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const verify = require('../verification/verifyToken');

router.post('/all', verify, async (req, res) => {
  User.findOne({ _id: req.user._id })
    .populate('orders').exec((err, user) => {
      if(!err) res.status(200).send(user.orders);
      else res.status(400).send({error: "Failed"});
      //console.log("Populated user: ", user)
    })
})

module.exports = router;
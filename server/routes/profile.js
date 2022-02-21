const router = require('express').Router();
const User = require('../model/User');
const Staff = require('../model/Staff');
const verify = require('../verification/verifyToken');

//get name from DB
router.post('/name', verify, async (req, res) => {
  //get user with given id
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });
  //else
  res.send({success: user.fname+' '+user.lname});
});

//get staff name from DB
router.post('/staff-name', verify, async (req, res) => {
  //get user with given id
  const user = await Staff.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });
  //else
  res.send({success: user.fname+' '+user.lname});
});

module.exports = router;
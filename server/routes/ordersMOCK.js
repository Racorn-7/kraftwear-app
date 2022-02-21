const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const verify = require('../verification/verifyToken');
const mockDB = require('../mockData/mockDB');

router.post('/all', verify, async (req, res) => {  
  //get user with given id
  const user = mockDB.mockUsers.find(user => user._id === req.user._id );
  if (!user) return res.status(400).send({error: 'No user found with these details'});
  //else
  res.send(user.orders);
})

module.exports = router;
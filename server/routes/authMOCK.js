const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mockDB = require('../mockData/mockDB');

//REGISTER CUSTOMER
router.post('/register', async (req, res) => {
  return res.status(400).send({ error: 'Not supported with Mock DB' });
});

//LOGIN MOCK CUSTOMER
router.post('/login', async (req, res) => {
  //check if uer exists
  const user = mockDB.mockUsers.find(user => user.email === req.body.email);
  //TODO find user in mock array
  if (!user) return res.status(400).send({ error: 'No user found with these details' });

  //check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ error: 'No user found with these details' });

  //token assignment - set it in header
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({ success: token });
})

module.exports = router;
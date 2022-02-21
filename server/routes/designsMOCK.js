const router = require('express').Router();
const User = require('../model/User');
const verify = require('../verification/verifyToken');
const Design = require('../classes/Design');
const mockDB = require('../mockData/mockDB');

//get own designs from DB
router.post('/own', verify, async (req, res) => {
  //get user with given id
  console.log(req.user._id);

  const user = mockDB.mockUsers.find(user => user._id === req.user._id);
  if (!user) return res.status(400).send({ error: 'No user found with these details' });
  //else
  res.send(user.designs);
});

//get (art) rented designs from DB
router.post('/art', verify, async (req, res) => {
  //get user with given id
  const user = mockDB.mockUsers.find(user => user._id === req.user._id);
  if (!user) return res.status(400).send({ error: 'No user found with these details' });
  //else
  res.send(user.rentedDesigns);
});

//TODO
router.post('/add', verify, async (req, res) => {
  return res.status(400).send({ error: 'Not yet supported for mock DB' });
});

//TODO
router.post('/delete', verify, async (req, res) => {
  return res.status(400).send({ error: 'Not yet supported for mock DB' });
});

router.post('/duplicate', verify, async (req, res) => {
  return res.status(400).send({ error: 'Not yet supported for mock DB' });
});

module.exports = router;
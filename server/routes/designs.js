const router = require('express').Router();
const User = require('../model/User');
const verify = require('../verification/verifyToken');
const Design = require('../classes/Design');

//get own designs from DB
router.post('/own', verify, async (req, res) => {
  //get user with given id
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });
  //else
  res.send(user.designs);
});

//get (art) rented designs from DB
router.post('/art', verify, async (req, res) => {
  //get user with given id
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });
  //else
  res.send(user.rentedDesigns);
});

router.post('/add', verify, async (req, res) => {
  //get user with given id
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });

  //else
  let designs = user.designs;
  const newLength = designs.push(new Design(
    req.body.name,
    req.body.images,
    req.body.garmentColor,
    req.body.garmentTypeName,
  ));//get these from req
  console.log("designs after: ", designs);

  user.designs = designs;
  user.save();

  res.status(200).send(designs[newLength - 1])
});
router.post('/update', verify, async (req, res) => {
  //get user with given id
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });

  const designToUpdate = user.designs.find(des => des._id.toString() === req.body._id);
  if (!designToUpdate) res.send({ error: "Failed" });
  else {
    designToUpdate.name = req.body.name;
    designToUpdate.images = req.body.images;
    designToUpdate.garmentColor = req.body.garmentColor;
    designToUpdate.garmentTypeName = req.body.garmentTypeName;

    user.save(function (err) {
      if (err) res.status(400).send({ error: 'Failed' });
      res.send({success:"updated"})
    });
  }
});

router.post('/delete', verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });

  try {
    const updatedDesigns = user.designs.pull({ _id: req.body.designID });
    user.save();
    res.send(updatedDesigns);
  } catch (err) {
    res.status(500).send({ error: "Could not delete, there was a problem with connecting to the server" });
  }
});

router.post('/duplicate', verify, async (req, res) => {
  //get user with given id
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });

  //else
  try {
    const designToDuplicate = user.designs.id(req.body.designID);
    //console.log(designToDuplicate);

    user.designs.push(new Design(
      req.body.name,
      designToDuplicate.details,
      designToDuplicate.images,
      designToDuplicate.garmentColor,
      designToDuplicate.garmentTypeName
    )
    );
    user.save();
    res.send(user.designs);
  } catch (err) {
    res.status(500).send({ error: "Could not add duplicate, there was a problem with connecting to the server" });
  }
});

module.exports = router;
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Staff = require('../model/Staff');
const { registerValidation, loginValidation } = require('../validation/validation');

//REGISTER CUSTOMER
router.post('/register', async (req, res) => {
  //validation
  console.log(req.body);
  
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  //check if user already in DB
  let emailExist;
  try {
    console.log(User);
    emailExist = await User.findOne({ email: req.body.email });
    
    if (emailExist) return res.status(400).send({ error: 'Email already in use' });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword
    });

    //save new user to DB
    try {
      const savedUser = await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.send({ success: token });
    } catch (err) {
      res.status(400).send({ error: "Couldn't connect to DB" });
    }
  } catch (err) {
    console.log(err);
  }
});

//LOGIN CUSTOMER
router.post('/login', async (req, res) => {
  //validation
  console.log("validation started..");
  const { error } = loginValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  if (error) return res.status(400).send({ error: error.details[0].message });

  console.log("validation passed..");

  let user = {};
  //check if uer exists
  try {
    user = await User.findOne(
      { email: req.body.email },
      'password _id ',
      function(err){
        if (err) console.log("error: ",err);
      }
    );

    if (!user) return res.status(400).send({ error: 'No user found with these details' });

    else {
      console.log("user found..");

      //check if password is correct
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send({ error: 'No user found with these details' });

      console.log("password matched..");

      //token assignment - set it in header
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header('auth-token', token).send({ success: token });
    }
  } catch (err) {
    console.log(err);
  }
})

//LOGIN STAFF
router.post('/staff-login', async (req, res) => {
  //validation
  console.log("validation started..");
  const { error } = loginValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  if (error) return res.status(400).send({ error: error.details[0].message });

  console.log("validation passed..");


  //TODO change to Staff
  let staff = {};
  //check if uer exists
  try {
    staff = await Staff.findOne(
      { email: req.body.email },
      'password _id ',//returning only two fields
      function(err){
        if (err) console.log("error: ",err);
      }
    );

    if (!staff) return res.status(400).send({ error: 'No staff user found with these details' });

    else {
      console.log("staff user found..");

      //check if password is correct
      const validPass = await bcrypt.compare(req.body.password, staff.password);
      if (!validPass) return res.status(400).send({ error: 'No user found with these details' });

      console.log("password matched..");

      //token assignment - set it in header
      const token = jwt.sign({ _id: staff._id }, process.env.TOKEN_SECRET);
      res.header('auth-token', token).send({ success: token });
    }

  } catch (err) {
    console.log(err);
    res.send({error: "Cannot log you in"})
  }
})

//REGISTER STAFF
router.post('/staff-register', async (req, res) => {
  //validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  //check if user already in DB
  let emailExist;
  try {
    emailExist = await Staff.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({ error: 'Email already in use' });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const staff = new Staff({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
      //supervisor: "",
    });

    //save new staff to DB
    try {
      const savedUser = await staff.save();
      const token = jwt.sign({ _id: staff._id }, process.env.TOKEN_SECRET);
      res.send({ success: token });
    } catch (err) {
      res.status(400).send({ error: "Couldn't connect to DB" });
    }
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
const router = require('express').Router();
const User = require('../model/User');
const verify = require('../verification/verifyToken');
const ProductLine = require('../classes/ProductLine');
const ProductType = require('../classes/ProductType');


//get own designs from DB
router.post('/get', verify, async (req, res) => {
  //get user with given id
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });
  //else
  res.send(user.cart);
});

//add new product to cart
router.post('/add', verify, async (req, res) => {
  //get user with given id
  await User.findOne({ _id: req.user._id }, function (err, user) {
    if (err) console.log(err);

    if (user) {
      try {
        let cart = user.cart;
        cart.items.push(new ProductLine(
          new ProductType(req.body.newProduct.productType.name),
          req.body.newProduct.size,
          req.body.newProduct.design,
          req.body.newProduct.garmentType,
          req.body.newProduct.color,
          req.body.newProduct.qtty,
        ));

        //console.log("cart after: ", cart);
        console.log("new product created..");

        user.cart = cart;
        user.save(
          function (err) {
            if (err) {
              res.status(400).send({ error: err.errors });
            }
            else {
              //send new updated cart back
              res.send(cart);
            }
          }
        );
      } catch (err) {
        console.log("error: ", err);
      }
    }
    else
      return res.status(400).send({ error: 'No user found with these details' });
  });
});

//remove item from cart
router.post('/remove', verify, async (req, res) => {
  //get user with given id
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });

  //else
  const newUserItems = user.cart.items.pull(req.body.productLineID);
  user.save();
  res.send(
    {
      _id: user.cart._id,
      items: newUserItems,
      status: user.cart.status
    });
});

//TODO
//update cart

router.post('/update', verify, async (req, res) => {
  //get user with given id
  await User.findOne({ _id: req.user._id }, function (err, user) {
    if (err) console.log(err);

    if (user) {
      const key = req.body.key;
      /*
      let value = () => {
        switch (key) {
          case "productType":
            return new ProductType(value);
          case "design":
            //return { _id: "id", name: req.body.value };
            return req.body.value;//TODO change to object later
          default:
            return req.body.value;
        }
      }
      */

      let value = req.body.value;
      if ((key === "productType")) value = new ProductType(value);
      //else if (key === "design") value = 
      const index = user.cart.items.findIndex(obj => obj._id == req.body.productLineID);

      if (index >= 0) {
        //console.log("before: ",user.cart.items[index][key]);
        user.cart.items[index][key] = value;
        //console.log("after: ",user.cart.items[index][key]);
      }

      user.save();
      res.send(user.cart);
    }
    else
      return res.status(400).send({ error: 'No user found with these details' });
  });
});



module.exports = router;
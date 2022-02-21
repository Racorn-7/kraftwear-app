const router = require('express').Router();
const mongoose = require('mongoose');
const Address = require('../classes/Address');
const verify = require('../verification/verifyToken');
const User = require('../model/User');
const PaymentMethod = require('../classes/PaymentMethod');

//set name
router.post('/name/set', verify, async (req, res) => {
    await User.findOne({ _id: req.user._id }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            try {
                let fname = req.body.fname;
                let lname = req.body.lname;
                
                user.fname = fname;
                user.lname = lname;
                user.save(
                    function (err) {
                        if (err) {
                            res.status(400).send({ error: err.errors });
                        }
                        else {
                            res.send({success: `${user.fname} ${user.lname}`});
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

//get email from DB
router.post('/email', verify, async (req, res) => {
    await User.findOne({ _id: req.user._id }, function (err, user) {
        if (err) res.status(400).send({error: "Failed"});
        res.send({success: user.email})
    });
});

//set email
router.post('/email/set',verify, async (req, res) => {
    await User.findOne({ _id: req.user._id }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            try {
                //TODO add check if newEmail is existing email address?
                //TODO validate newemail format!
                user.email = req.body.email;
                user.save(
                    function (err) {
                        if (err) {
                            res.status(400).send({ error: err.errors });
                        }
                        else {
                            res.send({success: req.body.email});
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

//get addresses from DB
router.post('/address/get',verify, async (req, res) => {
    //get user with given id
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(400).send({ error: 'No user found with these details' });
    //else
    res.send({success: user.address});
});

//add address
router.post('/address/add',verify, async (req, res) => {
    await User.findOne({ _id: req.user._id }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            try {

                console.log(req.body);
                
                let addresses = user.address || [];//if no address field set yet
                addresses.push(new Address(
                    req.body.addName,
                    req.body.addLineOne,
                    req.body.city,
                    req.body.postcode,
                    req.body.billing,
                    req.body.deliver
                ));

                user.address = addresses;
                user.save(
                    function (err) {
                        if (err) {
                            res.status(400).send({ error: err.errors });
                        }
                        else {
                            console.log("new address created..");
                            //send new updated address back
                            res.send({success: addresses});
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


//delete given address
router.post('/address/delete',verify, async (req, res) => {
    await User.findOne({ _id: req.user._id }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            try {
                console.log(req.body);
                user.address.pull({_id: req.body.addressID});              
                user.save(
                    function (err) {
                        if (err) {
                            res.status(400).send({ error: err.errors });
                        }
                        else {
                            //send new updated cart back
                            res.send({success: user.address});
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


//get payment method array from DB
router.post('/payment/get',verify, async (req, res) => {
    //get user with given id
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(400).send({ error: 'No user found with these details' });
    //else
    res.send({success: user.payMethod});
});

//add payment new detail
router.post('/payment/add',verify, async (req, res) => {
    await User.findOne({ _id: req.user._id }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            try {
                console.log(req.body);
                
                let payment = user.payMethod || [];
                payment.push(new PaymentMethod(
                    req.body.payMethodName,
                    req.body.nameOnCard,
                    req.body.cardNo,
                    req.body.type,
                ));

                console.log("new payment method created..");

                user.payMethod = payment;
                user.save(
                    function (err) {
                        if (err) {
                            res.status(400).send({ error: err.errors });
                        }
                        else {
                            //send new updated cart back
                            res.send({success: payment});
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

//delete given paymentdetail
router.post('/payment/delete',verify, async (req, res) => {
    await User.findOne({ _id: req.user._id }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            try {
                console.log(req.body);

                user.payMethod.pull({_id: req.body.pmID});              
                user.save(
                    function (err) {
                        if (err) {
                            res.status(400).send({ error: err.errors });
                        }
                        else {
                            //send new updated cart back
                            res.send({success: user.payMethod});
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


module.exports = router;
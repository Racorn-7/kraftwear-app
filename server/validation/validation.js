//VALIDATION
const Joi = require('@hapi/joi');

//Register
const registerValidation = data => {
  const schema = Joi.object({
    fname: Joi.string().min(1).required(),
    lname: Joi.string().min(1).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
}

//Login
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
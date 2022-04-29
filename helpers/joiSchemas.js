const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/)
    .required(),
});

module.exports = contactSchema;

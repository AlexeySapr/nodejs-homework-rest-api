const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const addJoiSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/)
    .required(),
  favorite: Joi.bool(),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  add: addJoiSchema,
  updateFavorite: updateFavoriteJoiSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };

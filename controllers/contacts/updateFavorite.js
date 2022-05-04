const mongoose = require("mongoose");
const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;

  const isValid = mongoose.isValidObjectId(contactId);
  console.log("isValid: ", isValid);
  if (!isValid) {
    throw createError(404);
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateFavorite;

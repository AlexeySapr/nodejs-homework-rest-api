const mongoose = require("mongoose");
const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;

  const isValid = mongoose.isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }

  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw createError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeById;
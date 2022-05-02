const mongoose = require("mongoose");
const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const isValid = mongoose.isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Contact.findById(contactId, "-createdAt -updatedAt");
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getById;

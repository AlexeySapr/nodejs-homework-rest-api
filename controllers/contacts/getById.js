const mongoose = require("mongoose");
const { Contact } = require("../../models/Contact");
const { createError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const isValid = mongoose.isValidObjectId(contactId);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Contact.findOne(
    { _id: contactId, owner },
    "-createdAt -updatedAt",
  );
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getById;

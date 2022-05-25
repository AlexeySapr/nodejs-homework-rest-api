const { Contact } = require("../../models/Contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 4, favorite } = req.query;
  const skip = (page - 1) * limit;
  const findParams = favorite ? { owner: _id, favorite } : { owner: _id };

  const result = await Contact.find(findParams, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", ["name", "email"]);
  res.json(result);
};

module.exports = getAll;

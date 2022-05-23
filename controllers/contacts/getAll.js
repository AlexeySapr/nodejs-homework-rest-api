const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const result = await Contact.find(
    { owner: _id },
    "-createdAt -updatedAt",
  ).populate("owner", ["name", "email"]);
  res.json(result);
};

module.exports = getAll;

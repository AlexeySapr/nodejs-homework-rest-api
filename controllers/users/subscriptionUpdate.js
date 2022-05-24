const { User } = require("../../models/user");

const subscriptionUpdate = async (req, res, next) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  const { name, email, subscription } = result;
  res.json({
    name,
    email,
    subscription,
  });
};

module.exports = subscriptionUpdate;

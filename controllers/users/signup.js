const { User } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { d: "wavatar" });
  await User.create({ name, email, password: hashPassword, avatarURL });

  res.status(201).json({
    user: {
      name,
      email,
      password,
    },
  });
};

module.exports = signup;

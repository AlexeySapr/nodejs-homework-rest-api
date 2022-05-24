const { User } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashPassword });

  res.status(201).json({
    user: {
      name,
      email,
      password,
    },
  });
};

module.exports = signup;

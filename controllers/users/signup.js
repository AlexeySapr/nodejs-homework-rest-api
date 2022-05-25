const { User } = require("../../models/User");
const { createError, sendMail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw createError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { d: "wavatar" });
  const verificationToken = nanoid();

  const mail = {
    to: email,
    subject: "Confirm your registration email address",
    text: "To confirm your registration email address",
    html: `<a 
      target="_blank"
      href="localhost:3000/api/users/verify/${verificationToken}">
      please follow the link
      </a>`,
  };

  await sendMail(mail);

  await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  res.status(201).json({
    user: {
      name,
      email,
      password,
    },
  });
};

module.exports = signup;

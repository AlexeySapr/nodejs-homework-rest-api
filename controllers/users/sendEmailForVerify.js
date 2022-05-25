const { createError, sendMail } = require("../../helpers");
const { User } = require("../../models/User");

const sendEmailForVerify = async (req, res, next) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw createError(401);
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Confirm your registration email address",
    text: "To confirm your registration email address",
    html: `<a 
      target="_blank"
      href="localhost:3000/api/users/verify/${user.verificationToken}">
      please follow the link
      </a>`,
  };

  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = sendEmailForVerify;

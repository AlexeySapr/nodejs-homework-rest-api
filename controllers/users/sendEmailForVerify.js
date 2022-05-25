const { createError, sendMail } = require("../../helpers");
const { User } = require("../../models/User");

const sendEmailForVerify = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401);
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Confirm your registration email address",
    html: `<h3>To confirm your registration email address, please follow the 
    <a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">link</a>
    </h3>`,
  };

  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = sendEmailForVerify;

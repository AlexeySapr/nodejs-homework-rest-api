const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async data => {
  try {
    const mail = { ...data, from: "alisax2021@gmail.com" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error.massege;
  }
};

module.exports = sendMail;

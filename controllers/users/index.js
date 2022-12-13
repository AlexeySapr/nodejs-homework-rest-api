const signup = require("./signup");
const login = require("./login");
const currentUser = require("./currentUser");
const logout = require("./logout");
const subscriptionUpdate = require("./subscriptionUpdate");
const avatarUpdate = require("./avatarUpdate");
const verifyUsersEmail = require("./verifyUsersEmail");
const sendEmailForVerify = require("./sendEmailForVerify");

module.exports = {
  signup,
  login,
  currentUser,
  logout,
  subscriptionUpdate,
  avatarUpdate,
  verifyUsersEmail,
  sendEmailForVerify,
};

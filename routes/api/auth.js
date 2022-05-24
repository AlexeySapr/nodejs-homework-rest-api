const express = require("express");

const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const { authCheck, validation } = require("../../middlewares");

const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/signup", validation(schemas.register), ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/current", authCheck, ctrlWrapper(ctrl.currentUser));

// router.patch("/users", authCheck, async (req, res, next) => {
//   const { _id } = req.user;
//   const { subscription } = req.query;
//   await User.findByIdAndUpdate(_id, { subscription });
// });

router.get("/logout", authCheck, ctrlWrapper(ctrl.logout));

module.exports = router;

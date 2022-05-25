const express = require("express");

const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const { authCheck, validation } = require("../../middlewares");

const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/signup", validation(schemas.register), ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/logout", authCheck, ctrlWrapper(ctrl.logout));

module.exports = router;

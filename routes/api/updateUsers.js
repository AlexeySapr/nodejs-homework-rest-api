const express = require("express");

const { schemas } = require("../../models/User");
const { ctrlWrapper } = require("../../helpers");
const { authCheck, validation, upload } = require("../../middlewares");

const ctrl = require("../../controllers/users");

const router = express.Router();

// Get current user
router.get("/current", authCheck, ctrlWrapper(ctrl.currentUser));

// Update users subscription
router.patch(
  "/",
  authCheck,
  validation(schemas.subscription),
  ctrlWrapper(ctrl.subscriptionUpdate),
);

router.patch("/avatars", authCheck, upload.single("avatar"), ctrl.avatarUpdate);

module.exports = router;

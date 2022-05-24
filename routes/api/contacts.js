const express = require("express");

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

const { validation } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const { authCheck } = require("../../middlewares");

const router = express.Router();

router.get("/", authCheck, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authCheck, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.add), authCheck, ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  validation(schemas.add),
  authCheck,
  ctrlWrapper(ctrl.updateById),
);

router.patch(
  "/:contactId/favorite",
  validation(schemas.updateFavorite),
  authCheck,
  ctrlWrapper(ctrl.updateFavorite),
);

router.delete("/:contactId", authCheck, ctrlWrapper(ctrl.removeById));

module.exports = router;

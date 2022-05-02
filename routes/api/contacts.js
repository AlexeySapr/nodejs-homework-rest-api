const express = require("express");

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

const { validation } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.add), ctrlWrapper(ctrl.add));

router.put(
  "/:contactId",
  validation(schemas.add),
  ctrlWrapper(ctrl.updateById),
);

router.patch(
  "/:contactId/favorite",
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite),
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

module.exports = router;

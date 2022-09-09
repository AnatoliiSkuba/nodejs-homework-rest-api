const express = require("express");

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.contacts.listContacts));

router.get("/:id", isValidId, ctrlWrapper(ctrl.contacts.getContactById));

router.post(
    "/",
    validationBody(schemas.addSchema),
    ctrlWrapper(ctrl.contacts.addContact)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.contacts.removeContact));

router.put(
    "/:id",
    isValidId,
    validationBody(schemas.addSchema),
    ctrlWrapper(ctrl.contacts.updateContact)
);

router.patch(
    "/:id/favorite",
    isValidId,
    validationBody(schemas.updateFavoriteSchema),
    ctrlWrapper(ctrl.contacts.updateStatusContact)
);

module.exports = router;

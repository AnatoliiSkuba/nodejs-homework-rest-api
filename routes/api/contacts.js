const express = require("express");

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const {
    authenticate,
    validationBody,
    isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.contacts.listContacts));

router.get(
    "/:id",
    authenticate,
    isValidId,
    ctrlWrapper(ctrl.contacts.getContactById)
);

router.post(
    "/",
    authenticate,
    validationBody(schemas.addSchema),
    ctrlWrapper(ctrl.contacts.addContact)
);

router.delete(
    "/:id",
    authenticate,
    isValidId,
    ctrlWrapper(ctrl.contacts.removeContact)
);

router.put(
    "/:id",
    authenticate,
    isValidId,
    validationBody(schemas.addSchema),
    ctrlWrapper(ctrl.contacts.updateContact)
);

router.patch(
    "/:id/favorite",
    authenticate,
    isValidId,
    validationBody(schemas.updateFavoriteSchema),
    ctrlWrapper(ctrl.contacts.updateStatusContact)
);

module.exports = router;

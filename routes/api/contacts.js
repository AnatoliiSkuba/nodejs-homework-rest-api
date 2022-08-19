const express = require("express");

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validationBody } = require("../../middlewares");

const schemas = require("../../schemas");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.contacts.listContacts));

router.get("/:id", ctrlWrapper(ctrl.contacts.getContactById));

router.post(
    "/",
    validationBody(schemas.contacts.add),
    ctrlWrapper(ctrl.contacts.addContact)
);

router.delete("/:id", ctrlWrapper(ctrl.contacts.removeContact));

router.put(
    "/:id",
    validationBody(schemas.contacts.add),
    ctrlWrapper(ctrl.contacts.updateContact)
);

module.exports = router;

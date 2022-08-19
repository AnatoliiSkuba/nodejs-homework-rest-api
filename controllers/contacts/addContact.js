const { contacts } = require("../../models");

const addContact = async (req, res, next) => {
    res.status(201).json(await contacts.addContact(req.body));
};

module.exports = addContact;

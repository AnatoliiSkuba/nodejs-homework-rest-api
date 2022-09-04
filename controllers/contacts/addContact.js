const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
    res.status(201).json(await Contact.create(req.body));
};

module.exports = addContact;

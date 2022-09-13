const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
    const { _id: owner } = req.user;
    res.status(201).json(await Contact.create({ ...req.body, owner }));
};

module.exports = addContact;

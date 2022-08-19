const { contacts } = require("../../models");
const RequestError = require("../../helpers/RequestError");

const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
        throw RequestError(404, "Not found");
    }
    res.json(result);
};

module.exports = updateContact;

const { contacts } = require("../../models");
const RequestError = require("../../helpers/RequestError");

const getContactById = async (req, res, next) => {
    const { id } = req.params;
    const contact = await contacts.getContactById(id);
    if (!contact) {
        throw RequestError(404, "Not found");
    }
    res.json({ status: "success", code: 200, data: contact });
};

module.exports = getContactById;

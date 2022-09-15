const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res, next) => {
    const { id } = req.params;
    const contact = await Contact.findById(id, "-createdAt -updatedAt");
    console.log(contact);
    if (!contact) {
        throw RequestError(404, "Not found");
    }
    res.json({ status: "success", code: 200, data: contact });
};

module.exports = getContactById;

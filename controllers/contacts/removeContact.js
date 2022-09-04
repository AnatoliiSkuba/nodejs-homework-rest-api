const { Contact } = require("../../models/contact");
const RequestError = require("../../helpers/RequestError");

const removeContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
        throw RequestError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
};

module.exports = removeContact;

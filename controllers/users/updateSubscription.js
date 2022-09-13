const { User } = require("../../models");
const RequestError = require("../../helpers/RequestError");

const updateSubscription = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        throw RequestError(400, "missing field subscription");
    }
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!result) {
        throw RequestError(404, "Not found");
    }
    res.json(result);
};

module.exports = updateSubscription;

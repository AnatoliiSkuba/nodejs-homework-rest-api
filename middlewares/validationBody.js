const { RequestError } = require("../helpers");

const validationBody = (schema) => {
    const func = async (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(RequestError(400, error.message));
        }
        next();
    };

    return func;
};

module.exports = validationBody;

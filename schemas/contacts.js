const Joi = require("joi");

const contactAddSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.string().min(3).max(30).required(),
});

module.exports = {
    add: contactAddSchema,
};

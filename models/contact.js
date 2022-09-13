const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            match: phoneRegexp,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(phoneRegexp).required(),
    favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool(),
});

const schemas = { addSchema, updateFavoriteSchema };

module.exports = { Contact, schemas };

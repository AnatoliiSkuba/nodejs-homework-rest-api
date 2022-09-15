const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");
const { uid } = require("uid");

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = uid();
    const result = await User.create({
        email,
        password: hashPassword,
        avatarURL,
        verificationToken,
    });
    const mail = {
        to: email,
        subject: "Sending with SendGrid is Fun",
        html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Нажмите для подтверждения email</a>`,
    };
    await sendEmail(mail);

    res.status(201).json({
        email: result.email,
        subscription: result.subscription,
    });
};

module.exports = signup;

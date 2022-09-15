const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw RequestError(400, "missing required field email");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(404, "Not found");
    }
    if (user.verify) {
        throw RequestError(400, "Verification has already been passed");
    }
    const mail = {
        to: email,
        subject: "Sending with SendGrid is Fun",
        html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blanck">Нажмите для подтверждения email</a>`,
    };
    await sendEmail(mail);

    res.json({
        message: "Verification email sent",
    });
};

module.exports = resendVerifyEmail;

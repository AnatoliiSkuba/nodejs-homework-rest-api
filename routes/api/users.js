const express = require("express");

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
    "/signup",
    validationBody(schemas.signupSchema),
    ctrlWrapper(ctrl.users.signup)
);

router.post(
    "/login",
    validationBody(schemas.loginSchema),
    ctrlWrapper(ctrl.users.login)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.users.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.users.current));

router.patch(
    "/",
    authenticate,
    validationBody(schemas.updateSubscriptionSchema),
    ctrlWrapper(ctrl.users.updateSubscription)
);

router.patch(
    "/avatars",
    authenticate,
    upload.single("avatarURL"),
    ctrlWrapper(ctrl.users.updateAvatar)
);

module.exports = router;

const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const registerValidator = require("../validators/register.validator");
const { body } = require("express-validator");
const router = Router();

router.post("/register", registerValidator, AuthController.register);

router.get("/activation/:id", AuthController.activation);

router.post("/login", body("email").isEmail(), AuthController.login);
// router.post("/logout", AuthController.logout);
// router.get("/refresh", AuthController.refresh);
// router.get("/get-users", authMiddleware, AuthController.getUser);
// router.post("/forgot-password", AuthController.forgotPassword);
// router.put("/recovery-account", AuthController.recoveryAccount);

module.exports = router;

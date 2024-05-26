const { Router } = require("express");
const { model } = require("mongoose");
const AuthController = require("../controllers/auth.controller");

let AuthRouter = Router();

AuthRouter.post("/register", AuthController.register);

module.exports = AuthRouter;

const UserDto = require("../dtos/user.dto");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const AuthService = require("../services/auth.service");
const TokenService = require("../services/token.service");
const { validationResult } = require("express-validator");
class AuthController {
    async register(req, res, next) {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: errors.array(),
                });
            }
            let { email, password } = req.body;
            let data = await AuthService.register(email, password);
            console.log(data);
            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
                message: "User registered successfully",
                ...data,
            });
        } catch (error) {
            next(error);
        }
    }
    async activation(req, res, next) {
        try {
            let { id } = req.params;
            let user = await AuthService.activate(id);
            let userDto = new UserDto(user);
            res.send({
                message: "User activated successfully",
                user: userDto,
            });
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: errors.array(),
                });
            }
            let { email, password } = req.body;
            let data = await AuthService.login(email, password);
            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
                message: "User logged in successfully",
                ...data,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();

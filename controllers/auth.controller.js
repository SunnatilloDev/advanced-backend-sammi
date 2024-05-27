const UserDto = require("../dtos/user.dto");
const tokenModel = require("../models/token.model");
const AuthService = require("../services/auth.service");
const { validationResult } = require("express-validator");
const tokenService = require("../services/token.service");
const UserModel = require("../models/user.model");
const authService = require("../services/auth.service");
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
            await tokenService.saveToken(data.user.id, data.refreshToken);
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
            res.send(`User ${userDto.email} activated successfully`);
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
            if (!data.user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            await tokenService.saveToken(data.user.id, data.refreshToken);
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
    async logout(req, res, next) {
        try {
            let { refreshToken } = req.cookies;
            let token = await tokenModel.findOne({ refreshToken });
            if (!token) {
                return res.status(404).json({
                    message: "Token not found",
                });
            }
            await tokenService.deleteToken(refreshToken);
            res.clearCookie("refreshToken");
            return res.status(200).json({
                message: "User logged out successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    // ! something is not right here
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const data = await authService.refresh(refreshToken);
            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            return res.json({ message: "Refreshed successfully", ...data });
        } catch (error) {
            next(error);
            data;
        }
    }
   
}

module.exports = new AuthController();

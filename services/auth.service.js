const { DOMAIN } = require("../config/settings");
const UserDto = require("../dtos/user.dto");
const tokenModel = require("../models/token.model");
const UserModel = require("../models/user.model");
const MailService = require("./mail.service");
const tokenService = require("./token.service");
const bcrypt = require("bcrypt");
class AuthService {
    async register(email, password) {
        try {
            let existUser = await UserModel.findOne({ email });
            if (existUser) {
                throw new Error("Email already exists");
            }
            let user = await UserModel.create({
                email,
                password: bcrypt.hashSync(password, 10),
            });
            await MailService.sendActivationMail(
                email,
                `http://${DOMAIN}/api/auth/activation/` + user._id
            );
            user = new UserDto(user);
            let tokens = tokenService.generateToken(user);
            return { user, ...tokens };
        } catch (error) {
            throw error;
        }
    }
    async activate(id) {
        let user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        user.isActivated = true;
        await user.save();

        return user;
    }
    async login(email, password) {
        try {
            let user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }
            if (!bcrypt.compareSync(password, user.password)) {
                throw new Error("Password is incorrect");
            }
            user = new UserDto(user);
            let tokens = tokenService.generateToken(user);
            return { user, ...tokens };
        } catch (error) {
            throw error;
        }
    }
    async refresh(refreshToken) {
        try {
            if (!refreshToken) {
                throw new Error("Bad authorization");
            }

            const userPayload = await tokenService.validateRefreshToken(
                refreshToken
            );
            const tokenDb = await tokenService.findToken(refreshToken);
            if (!userPayload || !tokenDb) {
                throw new Error("Bad authorization");
            }

            const user = await UserModel.findById(userPayload.id);
            const userDto = new UserDto(user);

            const tokens = tokenService.generateToken({ ...user });

            await tokenService.saveToken(user._id, tokens.refreshToken);

            return { user: userDto, ...tokens };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthService();

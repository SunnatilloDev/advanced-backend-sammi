const UserDto = require("../dtos/user.dto");
const UserModel = require("../models/user.model");
const tokenService = require("./token.service");
const bcrypt = require("bcrypt");
class AuthService {
    async register(email, password) {
        try {
            let existUser = await UserModel.findOne({ email });
            if (existUser) {
                return {
                    message: "User already exists with this email",
                };
            }
            let user = await UserModel.create({
                email,
                password: bcrypt.hashSync(password, 10),
            });
            let tokens = tokenService.generateToken(user);
            user = new UserDto(user);
            return { user, ...tokens };
        } catch (error) {
            console.log(error);
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
        let user = await UserModel.findOne({ email });
        if (!user) {
            return {
                message: "User not found",
            };
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return {
                message: "Password is incorrect",
            };
        }
        let tokens = tokenService.generateToken(user);
        user = new UserDto(user);
        return { user, ...tokens };
    }
}

module.exports = new AuthService();

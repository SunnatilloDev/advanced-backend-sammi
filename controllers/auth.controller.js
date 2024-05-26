const UserDto = require("../dtos/user.dto");
const UserModel = require("../models/user.scheme");
const bcrypt = require("bcrypt");
class AuthController {
    async register(req, res) {
        try {
            let { email, password } = req.body;
            let user = await UserModel.create({
                email,
                password: bcrypt.hash(password, 10),
            });
            user = new UserDto(user);
            res.status(200).json({
                message: "User registered successfully",
                user,
            });
        } catch (error) {
            // TODO
        }
    }
}

module.exports = new AuthController();

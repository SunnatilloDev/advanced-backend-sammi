const UserDto = require("../dtos/user.dto");
const UserModel = require("../models/user.model");

class UserService {
    async getUsers() {
        return await UserModel.find();
    }
    async getUser(id) {
        let user = await UserModel.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        user = new UserDto(user);
        return user;
    }
    async deleteUser(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}

module.exports = new UserService();

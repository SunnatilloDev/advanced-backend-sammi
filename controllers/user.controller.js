const authService = require("../services/auth.service");
const userService = require("../services/user.service");

class UserController {
    async getUsers(req, res, next) {
        try {
            let data = await userService.getUsers();
            res.json(data);
        } catch (err) {
            next(err);
        }
    }
    async getUser(req, res, next) {
        try {
            let { id } = req.params;
            let data = await userService.getUser(id);
            res.json(data);
        } catch (err) {
            next(err);
        }
    }
    async deleteUser(req, res, next) {
        try {
            let { id } = req.params;
            let data = await userService.deleteUser(id);
            res.json({ message: "User deleted successfully", user: data });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();

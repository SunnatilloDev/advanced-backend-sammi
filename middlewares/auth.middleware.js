const UserModel = require("../models/user.model");
const tokenService = require("../services/token.service");

let authMiddleware = async (req, res, next) => {
    let accessToken = req.headers.authorization;

    if (!accessToken) {
        return res.status(401).json({
            message: "Access token is missing",
        });
    }
    accessToken = accessToken.split(" ")[1];
    let userData = await tokenService.validateAccessToken(accessToken);
    console.log(userData);

    let user = await UserModel.findById(userData.id);

    if (!userData || !user) {
        return res.status(401).json({
            message: "Invalid access token",
        });
    }

    req.user = user;
    next();
};

module.exports = authMiddleware;

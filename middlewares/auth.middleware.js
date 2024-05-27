const tokenService = require("../services/token.service");

let authMiddleware = (req, res, next) => {
    let accessToken = req.headers.authorization;

    if (!accessToken) {
        return res.status(401).json({
            message: "Access token is missing",
        });
    }
    accessToken = accessToken.split(" ")[1];
    let userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
        return res.status(401).json({
            message: "Invalid access token",
        });
    }
    req.user = userData;
    next();
};

module.exports = authMiddleware;

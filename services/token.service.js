let jwt = require("jsonwebtoken");
const tokenModel = require("../models/token.model");

class TokenService {
    generateToken(payload) {
        payload = payload.toObject();
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
            expiresIn: "30d",
        });
        return { accessToken, refreshToken };
    }
    async saveToken(user, refreshToken) {
        let token = await tokenModel.findOne({ user });
        if (token) {
            token.refreshToken = refreshToken;
            await token.save();
            return;
        }
        await tokenModel.create({
            user,
            refreshToken,
        });
    }
    async deleteToken(refreshToken) {
        await tokenModel.deleteOne({ refreshToken });
    }
    async findToken(refreshToken) {
        return await tokenModel.findOne({ refreshToken });
    }
    async validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_KEY);
        } catch (error) {
            return false;
        }
    }
    async validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_KEY);
        } catch (error) {
            return false;
        }
    }
}

module.exports = new TokenService();

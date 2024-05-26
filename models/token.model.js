let { Schema, model } = require("mongoose");

let tokenScheme = new Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = model("Token", tokenScheme);

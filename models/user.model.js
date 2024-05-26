const { Schema } = require("mongoose");
let mongoose = require("mongoose");

let UserScheme = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: [true, "Email already exists"],
        },
        password: {
            type: String,
            required: true,
        },
        isActivated: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

let UserModel = mongoose.model("user", UserScheme);

module.exports = UserModel;

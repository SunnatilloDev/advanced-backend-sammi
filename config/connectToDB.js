let mongoose = require("mongoose");
const { DB } = require("./settings");
mongoose
    .connect(DB)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB: ", err);
    });

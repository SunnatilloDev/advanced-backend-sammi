const { configDotenv } = require("dotenv");
configDotenv();
let { PORT, DB } = process.env;
module.exports = {
    PORT,
    DB,
};

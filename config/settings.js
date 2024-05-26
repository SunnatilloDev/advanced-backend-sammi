const { configDotenv } = require("dotenv");
configDotenv();
let { PORT,DOMAIN, DB, SMTP_PASS, SMTP_PORT, SMTP_HOST, SMTP_USER } = process.env;
module.exports = { DOMAIN,PORT, DB, SMTP_PASS, SMTP_PORT, SMTP_HOST, SMTP_USER };

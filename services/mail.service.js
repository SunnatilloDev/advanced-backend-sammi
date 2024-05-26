let nodemailer = require("nodemailer");
const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
} = require("../config/settings");
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });
    }
    async sendActivationMail(email, link) {
        this.transporter.sendMail({
            from: SMTP_USER,
            to: email,
            subject: "Account activation",
            html: `<a href="${link}">Click here to activate your account</a>`,
        });
    }
}

module.exports = new MailService();

const { body, validationResult } = require("express-validator");

let registerValidator = [
    body("password").isLength({ min: 4, max: 20 }).isString(),
    body("email").isEmail(),
    (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.array(),
            });
        }
        next();
    },
];

module.exports = registerValidator;

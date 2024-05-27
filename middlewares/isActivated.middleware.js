let isActivated = (req, res, next) => {
    if (req.user.isActivated) {
        next();
    } else {
        res.status(401).json({
            message: "User is not activated",
        });
    }
};

module.exports = isActivated;
//6653dc7f4283a236d06159c9

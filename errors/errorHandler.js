let errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    if (err.code == 11000) {
        res.json({
            message: "Duplicate key error",
            error: err,
            success: false,
        });
    }
    res.json({
        message: err.message,
        error: err,
        success: false,
    });
};

module.exports = errorHandler;

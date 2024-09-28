const passport = require("passport");

exports.attachUserToRequest = (req, res, next) => {
    req.user = req.user || null;
    next();
};
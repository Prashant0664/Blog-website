const jwt = require("jsonwebtoken");
const keys = require("../config/keys");


exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, keys.TOKEN_SECRET, {
    expiresIn: expired,
  });
};


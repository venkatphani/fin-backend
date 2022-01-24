const jwt = require("jsonwebtoken");

const jwtPrivateKey = require("../config/keys");
const db = require("../models");
const User = db.user;

/**
 * Authenticates the token for access across different APIs. The function extracts the authentication
 * from the headers and verifies it againts the jwtPublicKey. Based on the response from this middleware, other routes are processed.
 */
async function emailAuthMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (header) {
      const bearer = header.split(" ");
      const token = bearer[1];
      if (token && token.split(".").length === 3) {
        const decoded = jwt.verify(token, jwtPrivateKey, { ignoreExpiration: false, algorithms: ["ES256"] });
        const user = await User.findOne({ where: { email: decoded.email } });
        if (user) {
          req.user = user;
          return next();
        }
        return res.status(403).json({ success: false, error: { message: "Invalid user" } });
      } else {
        return res.status(401).json({ error: { message: "Missing authorization header" }, success: false });
      }
    }
    return res.status(401).json({ error: { message: "Missing authorization header" }, success: false });
  } catch (error) {
    return res.status(401).json({ error: { message: "Session expired. Please log back in.", type: "OAuthException" }, success: false });
  }
}

module.exports = emailAuthMiddleware;

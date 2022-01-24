const express = require("express");
const users = require("./user");
const articles = require("./article");
const emailAuthMiddleware = require("../middleware/emailAuthentication");

const router = express.Router();

router.use("/user", users);
router.use("/article", emailAuthMiddleware, articles);

module.exports = router;

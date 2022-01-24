const express = require("express");
const bcrypt = require("bcryptjs");
const pify = require("pify");
const pifiedBcrypt = pify(bcrypt);
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const { validationMiddleware } = require("../validations/middleware");

const router = express.Router();

router.post("/register", validationMiddleware(["email", "password"]), async (req, res) => {
  const errors = {};
  const { password, email } = req.body;
  try {
    const salt = await pifiedBcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      errors.message = "Email is already registered";
      res.status(409).json({ error: errors, success: false });
    }
    await User.create({ email, password: hash });
    return res.status(200).json({ success: true, message: "Registered Successfully" });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
});

router.post("/login", validationMiddleware(["email", "password"]), async (req, res) => {
  const errors = {};
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      errors.message = "Email or Password is incorrect";
      return res.status(404).json({ error: errors, success: false });
    }
    const isMatch = await pifiedBcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.message = "Email or Password is incorrect";
      return res.status(401).json({ error: errors, success: false });
    }
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, keys, { expiresIn: "6h", algorithm: "ES256" });
    return res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
});

module.exports = router;

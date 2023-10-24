require("dotenv").config();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).send("Missing email or password");
      return;
    }

    try {
      const sanitizedEmail = email.toLowerCase();
      const existingUser = await User.findOne({ email: sanitizedEmail });
      let correctPassword = false;
      if (existingUser) {
        correctPassword = await bcrypt.compare(password, existingUser.password);
      }
      if (correctPassword) {
        const token = jwt.sign(
          { user_id: existingUser.user_id },
          "thisisprobablythebestjwtkeyihaveeverseen",
          { expiresIn: "1d" }
        );
        res.status(200).json({ token, userId: existingUser.user_id });
        return;
      }
      res.status(401).send("Invalid Credentials");
    } catch (e) {
      res.status(400).send(e.message);
      console.log(e.message);
    }
  },

  signup: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      // console.log("here");
      res.status(409).send("Missing email or password");
      return;
    }
    // console.log(email, password);
    const generatedUserId = uuidv4();
    const hashed_password = await bcrypt.hash(password, 10);
    try {
      const sanitizedEmail = email.toLowerCase();
      const existingUser = await User.find({ email: sanitizedEmail });
      if (existingUser.length > 0) {
        return res.status(409).send("User already exists, Please Login");
      }
      const newUser = new User({
        user_id: generatedUserId,
        email: sanitizedEmail,
        password: hashed_password,
      });

      const insertedUser = await newUser.save();

      const token = jwt.sign(
        { user_id: generatedUserId },
        "thisisprobablythebestjwtkeyihaveeverseen",
        {
          expiresIn: "1d",
        }
      );
      res.status(201).json({ token, userId: generatedUserId });
    } catch (e) {
      console.log(e);
      res.status(409).send(e.message);
    }
  },
};

module.exports = authController;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers");

const router = express.Router();

const { SECRET_KEY } = process.env;

router.post("/signup", async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      throw createError(400, "Email or password invalid");
    }

    const { name, email, password } = req.body;
    const result = await User.findOne({ email });
    if (result) {
      throw createError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashPassword });

    res.status(201).json({
      user: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = schemas.login.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("user: ", user);
    if (!user) {
      throw createError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw createError(401, "Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    const { subscription } = user;

    res.json({
      token,
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

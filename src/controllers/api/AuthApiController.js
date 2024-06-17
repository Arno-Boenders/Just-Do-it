import User from "../../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // check errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      res.status(400).json({
        message: error.msg,
      });
    });
  }
  const user = await User.query().findOne({ email: email });
  if (!user) {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }

  // token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.TOKEN_SALT,
    {
      expiresIn: "1h",
    }
  );

  // set cookie, this is very unsafe, but for now it's okay
  res.cookie("user", token, { httpOnly: true });

  res.status(200).json({
    message: "Login successful",
    user,
  });
};

export const register = async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.query().insert({
    firstname,
    lastname,
    email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  res.status(201).json({
    message: "User created",
    user,
  });
};
export const postRegister = async (req, res, next) => {
  // check errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      res.status(400).json({
        message: error.msg,
      });
    });
  }
  const userExists = await User.query().findOne({ email: req.body.email });
  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
  }
  next();
};

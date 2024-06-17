import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export default async (req, res, next) => {
  try {
    const userToken = req.cookies.user;

    if (!userToken) {
      return res.redirect("/login");
    }
    const userData = jwt.verify(userToken, process.env.TOKEN_SALT);
    if (!userData) {
      return res.redirect("/login");
    }

    const user = await User.query().findById(userData.id);
    if (!user) {
      return res.redirect("/login");
    }

    req.user = user;

    return next();
  } catch (e) {
    res.redirect("/login");
  }
};

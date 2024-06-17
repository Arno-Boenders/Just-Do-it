import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "127.0.0.1",
  port: process.env.MAIL_PORT || 1025,
  auth: {
    user: process.env.MAIL_USER || "project.1",
    pass: process.env.MAIL_PASS || "secret.1",
  },
});
export default transporter;

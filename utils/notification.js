import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export const GMAIL_USER = process.env.GMAIL_USER;
export const GMAIL_PASS = process.env.GMAIL_PASS;
export const FromAdminMail = process.env.FromAdminMail;
export const userSubject = process.env.userSubject;

export const mailSent = async (from, to, subject, html) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const response = await transport.sendMail({
      from: FromAdminMail,
      subject: userSubject,
      to,
      html,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

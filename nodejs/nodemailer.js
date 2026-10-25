import express from "express";
import nodemailer from "nodemailer";

const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "repalce with your own emal",
    pass: "replace with your own app password",
  },
});

const mailOptions = {
  from: "vikasthakur.main@gmail.com",

  to: "rishit.maiti@gmail.com",

  subject: "Regarding your demo of nodejs nodemailer setup",

  text: "Hope you are doing well! by geeksforgeks",
};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) throw error;
  console.log("email sent" + info.response);
});

app.get("/", (req, res) => {

  res.send("hello");
});

app.listen(3000, () => {
  console.log("server is running");
});

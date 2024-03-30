// const nodemailer = require('nodemailer');
import dotenv from "dotenv";
dotenv.config()
import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_ADDRESS,
//     pass: process.env.EMAIL_APP_PASSWORD,
//   },
// // });
// console.log(process.env.ZOHO_EMAIL_ADDRESS)
// console.log(process.env.ZOHO_EMAIL_PASSWORD)

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL_ADDRESS,
    pass: process.env.ZOHO_EMAIL_PASSWORD,
  },
});

export default async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: `Internship Management Portal <${process.env.ZOHO_EMAIL_ADDRESS}>`, // Replace with your email address
    to: email,
    subject: 'OTP for Signup Verification',
    // text: `Your OTP for signup verification is: ${otp}. Please enter this OTP within 5 minutes.`,
    html:
      `
      <div style="background-color: #802121; padding: 20px;">
        <h1 style="color: #fcfafa;">Your OTP for Internship Management Portal is: <strong style="color: #fcfafa; background-color: #000000; padding: 2px 9px; border-radius: 8px;">${otp}</strong></h1>
        <p style="color: #fcfafa; font-size: 16px;">Please enter this OTP within 5 minutes.</p>
        <div style="display: flex; align-items: center; color: #fcfafa; font-size: 14px; padding-top: 50px;">
          <img src="https://i.imgur.com/IeFDAZ6.png" alt="Somaiya Logo" title="Somaiya Logo" style="display: block; height: 45px; width: 45px; margin-right: 10px; background: white; border-radius: 4px">
          <span>
            <p style="color: #fcfafa">This is an automated email. Please do not reply.</p>
            <p style="color: #fcfafa">From Internship Management Portal, 2024.</p>
          </span>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
    return (true)
  } catch (err) {
    console.error('Error sending OTP email:', err);
    return (false)
  }
}

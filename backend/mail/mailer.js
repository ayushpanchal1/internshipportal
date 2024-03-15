// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'your_email_service',
  auth: {
    user: 'your_email_address',
    pass: 'your_email_password',
  },
});

export default async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: 'your_email_address', // Replace with your email address
    to: email,
    subject: 'OTP for Signup Verification',
    text: `Your OTP for signup verification is: ${otp}. Please enter this OTP within 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (err) {
    console.error('Error sending OTP email:', err);
  }
}

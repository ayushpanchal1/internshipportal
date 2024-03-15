// const otpGenerator = require('otp-generator');
import otpGenerator from 'otp-generator'
import OTPModel from './models/OTPModel.model.js'
import sendOTPEmail from './mail/mailer.js'

export async function generateOtp(req, res) {
    try {
        const otp = otpGenerator.generate(6, { digits: true }); // Generate 6-digit OTP

        await OTPModel.create({
            email: req.body.email,
            otp: otp,
            expiresAt: moment().add(5, 'minutes'), // OTP expiration time
        });

        await sendOTPEmail(req.body.email, otp)
        return res.json({ status: 'otp was sent' });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

export async function verifyOTP(email, otp) {
    try {

      // Find the OTP record in the database
      const otpRecord = await OTPModel.findOne({ email: email });
  
      // Check if OTP record exists and is not expired
      if (!otpRecord || moment().isAfter(otpRecord.expiresAt)) {
        throw new Error ('OTP expired or invalid')
      }
  
      // Check if the entered OTP matches the stored OTP
      if (otp !== otpRecord.otp) {
        throw new Error ('Invalid OTP')
      }
      // If OTP is valid, proceed with creating the user account
      // Delete the OTP record from the database
      await OTPModel.deleteOne({ email: email }); 
      return(true)
    } catch (error) {
      console.log(error.message);
      return(false)
    }
  }

// module.exports = generateOtp;

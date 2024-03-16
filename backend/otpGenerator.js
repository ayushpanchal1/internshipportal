// const otpGenerator = require('otp-generator');
import otpGenerator from 'otp-generator'
import OTPModel from './models/OTPModel.model.js'
import sendOTPEmail from './mail/mailer.js'
import moment from 'moment';

export async function generateOtp(req, res) {
    try {
        const otp = otpGenerator.generate(6, { digits: true }); // Generate 6-digit OTP

        await OTPModel.create({
            email: req.body.email,
            otp: otp,
            expiresAt: moment().add(5, 'minutes'), // OTP expiration time
        });

        var mailstatus = await sendOTPEmail(req.body.email, otp)
        if(mailstatus == true ) {
          return res.json({ status: 'otp was sent' });
        } else {
          throw new Error("Error sending the OTP");
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

export async function verifyOTP(email, otp) {
    try {

      // Find the OTP record in the database
      const otpRecord = await OTPModel.findOne({ email: email });
  
      // Check if OTP record exists 
      if (!otpRecord) {
        throw new Error ('OTP invalid')
      }

      // check if OTP is not expired
      if (moment().isAfter(otpRecord.expiresAt)){
        await OTPModel.deleteOne({ email: email }); 
        throw new Error ('OTP invalid')
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

import mongoose from "mongoose";

const OTPModel = new mongoose.Schema(
	{
		email: { type: String, required: true },
        otp: { type: String, required: true  }, // one time password
        expiresAt: { type: Date, required: true  }, // Timestamp for OTP expiration
	},
	{ collection: 'otp-data' }
)

export default mongoose.model('OTPModelData', OTPModel);
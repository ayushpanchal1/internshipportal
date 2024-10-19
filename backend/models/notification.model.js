import mongoose from "mongoose";

const Notification = new mongoose.Schema(
	{	
		studentid: { type: String, required: true },
		teachername: { type: String, required: true },
		teacherid: { type: String, required: true },
		approvalstatus: { type: Number, required: true },
		message: { type: String, required: true},
	},
	{ collection: 'Notification-data' }
)

export default mongoose.model('NotificationData', Notification);
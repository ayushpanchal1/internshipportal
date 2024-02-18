import mongoose from "mongoose";

const Notif = new mongoose.Schema(
	{	
		email: { type: String, required: true },
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		title: { type: String, required: true },
        info: { type: String, required: true },
		link: { type: String, required: true },
		quote: { type: String },
	},
	{ collection: 'notif-data' }
)

export default mongoose.model('NotifData', Notif);
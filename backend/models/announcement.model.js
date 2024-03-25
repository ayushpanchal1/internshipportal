import mongoose from "mongoose";

const Announcement = new mongoose.Schema(
	{	
		teacher_id: { type: String, required: true },
		email: { type: String, required: true },
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		title: { type: String, required: true },
        info: { type: String, required: true },
		link: { type: String, required: true },
	},
	{ collection: 'Announcement-data' }
)

export default mongoose.model('AnnouncementData', Announcement);
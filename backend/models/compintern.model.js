import mongoose from "mongoose";

const CompIntern = new mongoose.Schema(
	{
		stu_id: { type: String, required: true },
		stuname: { type: String, required: true},
		stufname: { type: String, required: true},
		stulname: { type: String, required: true},
		classteacher: { type: String, required: true },
        classteacherid: { type: String },
        hod: { type: String, required: true },
        hodid: { type: String },	
		email: { type: String, required: true },
		stuname: { type: String, required: true },
		provider: { type: String, required: true },
		fromduration: { type: String, required: true },
		toduration: { type: String, required: true },
        whatfor: { type: String, required: true },
		domain: { type: String, required: true },
	},
	{ collection: 'completed-internships-data' }
)

export default mongoose.model('CompInternData', CompIntern);
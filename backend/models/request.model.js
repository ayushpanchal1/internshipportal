import mongoose from "mongoose";

const Request = new mongoose.Schema(
	{
        studentid: { type: String, required: true },
        studentemail: { type: String, required: true },
		firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        seatno: {type: Number, required: true},
		academicyear: { type: Number, required: true },
        department: { type: String, required: true },
        semester: {type: Number, required: true},
        division: { type: String, required: true },
        classteacher: { type: String, required: true },
        classteacherid: { type: String, required: true },
        hod: { type: String, required: true },
        hodid: { type: String, required: true },
		mothername: { type: String, required: true },
		fathername: { type: String, required: true },
        fromduration: { type: String, required: true },
		toduration: { type: String, required: true },
        companyname: { type: String, required: true },
        companyaddress: { type: String, required: true },
        whatfor: { type: String, required: true },
		domain: { type: String, required: true },
        approvalstatus: { type: Number, required: true }, //0 for none, 1 for classteacher, 2 for hod, 3 for declined
        declinemsg: { type: String },   
        pdfdata: {type: Buffer},
	},
	{ collection: 'request-data' }
)

export default mongoose.model('RequestData', Request);
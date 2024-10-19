import mongoose from "mongoose";
import Student from "./student.model.js"

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
        classteacherid: { type: String },
        hod: { type: String, required: true },
        hodid: { type: String },
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

Request.post('save', async function(doc) {
    // console.log('Hit save middleware');
    // console.log('Request document:', doc);

    try {
        const student = await Student.findById(doc.studentid);
        // console.log('Found student:', student);

        if (student) {
            const requestCount = await RequestModel.countDocuments({ studentid: doc.studentid });
            // console.log('Request count:', requestCount);
            const activeRequestCount = await RequestModel.countDocuments({ studentid: doc.studentid, approvalstatus:{ $in: [0, 1, 2] }});
            const declinedRequestCount = await RequestModel.countDocuments({ studentid: doc.studentid, approvalstatus:3})

            student.internshipRequestCount = requestCount;
            student.activeInternshipRequestCount = activeRequestCount;
            student.declinedInternshipRequestCount = declinedRequestCount;
            await student.save();
            // console.log('Student document updated:', student);
        } else {
            console.log('Student not found for id:', doc.studentid);
        }
    } catch (error) {
        console.error('Error updating student:', error);
    }
});

Request.post('findOneAndDelete', async function(doc) {
    // console.log('Hit del middleware');
    // console.log('Request document:', doc);

    try {
        const student = await Student.findById(doc.studentid);
        // console.log('Found student:', student);

        if (student) {
            const requestCount = await RequestModel.countDocuments({ studentid: doc.studentid });
            // console.log('Request count:', requestCount);
            const activeRequestCount = await RequestModel.countDocuments({ studentid: doc.studentid, approvalstatus:{ $in: [0, 1, 2] }});
            const declinedRequestCount = await RequestModel.countDocuments({ studentid: doc.studentid, approvalstatus:3})

            student.internshipRequestCount = requestCount;
            student.activeInternshipRequestCount = activeRequestCount;
            student.declinedInternshipRequestCount = declinedRequestCount;
            await student.save();
            // console.log('Student document updated:', student);
        } else {
            console.log('Student not found for id:', doc.studentid);
        }
    } catch (error) {
        console.error('Error updating student:', error);
    }
});

const RequestModel = mongoose.model('RequestData', Request);

export default mongoose.model('RequestData', Request);
import mongoose from "mongoose";
import Student from './student.model.js'

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
		certificateLink: { type: String },
		provider: { type: String, required: true },
		fromduration: { type: String, required: true },
		toduration: { type: String, required: true },
        whatfor: { type: String, required: true },
		domain: { type: String, required: true },
	},
	{ collection: 'completed-internships-data' }
)

CompIntern.post('save', async function(doc) {
    console.log('Hit save middleware');
    // console.log('CompIntern document:', doc);

    try {
        const student = await Student.findById(doc.stu_id);
        // console.log('Found student:', student);

        if (student) {
            const CompInternCount = await CompInternModel.countDocuments({ stu_id: doc.stu_id });
            // console.log('CompIntern count:', CompInternCount);

            student.completedInternshipCount = CompInternCount;
            await student.save();
            // console.log('Student document updated:', student);
        } else {
            console.log('Student not found for id:', doc.stu_id);
        }
    } catch (error) {
        console.error('Error updating student:', error);
    }
});

CompIntern.post('findOneAndDelete', async function(doc) {
    // console.log('Hit del middleware');
    // console.log('CompIntern document:', doc);

    try {
        const student = await Student.findById(doc.stu_id);
        // console.log('Found student:', student);

        if (student) {
            const CompInternCount = await CompInternModel.countDocuments({ stu_id: doc.stu_id });
            // console.log('CompIntern count:', CompInternCount);

            student.completedInternshipCount = CompInternCount;
            await student.save();
            // console.log('Student document updated:', student);
        } else {
            console.log('Student not found for id:', doc.stu_id);
        }
    } catch (error) {
        console.error('Error updating student:', error);
    }
});

const CompInternModel = mongoose.model('CompInternData', CompIntern);

export default mongoose.model('CompInternData', CompIntern);
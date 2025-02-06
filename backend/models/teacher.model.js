import mongoose from "mongoose";

const Teacher = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        gender: { type: String, enum: ['male','female','other']},
        department: { type: String, required: true },
        domain: { type: String, required: true }, //ex: ybersec, blockchain, webdev, database, dsa, web3, etc.
        role: { type: String, required: true }, //ex: prof, hod, principal, etc.
        dateofbirth: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ collection: 'teacher-data' }
)

const model = mongoose.model('TeacherData', Teacher)


export default mongoose.model('TeacherData', Teacher);
const mongoose = require('mongoose')

const Student = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        gender: { type: String, enum: ['male','female','other']},
        seatno: {type: Number, required: true},
		academicyear: { type: String, required: true },
        department: { type: String, required: true },
        semester: {type: Number, required: true},
        division: { type: String, required: true },
        classteacher: { type: String, required: true },
        hod: { type: String, required: true },
        address: {type: String, required: true},
		mothername: { type: String, required: true },
		fathername: { type: String, required: true },
		mobileno: { type: String, required: true },
        dateofbirth: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ collection: 'student-data' }
)

const model = mongoose.model('StudentData', Student)

module.exports = model
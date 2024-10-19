import mongoose from "mongoose";

const Student = new mongoose.Schema(
    {
        stuname: { type: String, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        gender: { type: String, enum: ['male', 'female', 'other'] },
        seatno: { type: Number, required: true },
        academicyear: { type: Number, required: true },
        department: { type: String, required: true },
        semester: { type: Number, required: true },
        division: { type: String, required: true },
        classteacher: { type: String, required: true },
        hod: { type: String, required: true },
        address: { type: String, required: true },
        mothername: { type: String, required: true },
        fathername: { type: String, required: true },
        mobileno: { type: Number, required: true },
        dateofbirth: { type: String, required: true },
        internshipRequestCount: { type: Number, default: 0 },
        activeInternshipRequestCount: { type: Number, default: 0 },
        declinedInternshipRequestCount: { type: Number, default: 0 },
        completedInternshipCount: { type: Number, default: 0 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection: 'student-data' }
)

export default mongoose.model('StudentData', Student);
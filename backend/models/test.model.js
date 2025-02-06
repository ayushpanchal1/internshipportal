import mongoose from "mongoose";

const Test = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ collection: 'test-data' }
)

const model = mongoose.model('TestData', Test)

export default mongoose.model('TestData', Test);
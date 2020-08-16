import mongoose from 'mongoose'

var surveySchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model('survey', surveySchema)
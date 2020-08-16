import mongoose from 'mongoose'

let contactSchema = new mongoose.Schema({
    'name': String,
    'email': String,
    'role': String,
    'workplace': String,
    'address': String,
    'position': String,
    'referid': String
})

export default mongoose.model('contact', contactSchema)
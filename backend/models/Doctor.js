import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const doctorSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  clinic: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
});

const Doctor = model('Doctor', doctorSchema);

export default Doctor;

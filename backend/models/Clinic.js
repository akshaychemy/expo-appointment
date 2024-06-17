import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const clinicSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const Clinic = model('Clinic', clinicSchema);

export default Clinic;

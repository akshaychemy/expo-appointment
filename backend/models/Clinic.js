import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const clinicSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  services: [{ type: String, required: true }], // Add services field
});

const Clinic = model('Clinic', clinicSchema);

export default Clinic;


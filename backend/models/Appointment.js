import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const appointmentSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  clinic: { type: Schema.Types.ObjectId, ref: 'Clinic', required: true },
  selectedService: { type: String, required: true },
  selectedDoctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
});

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;


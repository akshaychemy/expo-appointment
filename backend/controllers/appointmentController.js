import Appointment from '../models/Appointment.js';

// Controller to book an appointment
export const bookAppointment = async (req, res) => {
  const { name, phoneNumber, clinic, selectedService, selectedDoctor, date, timeSlot } = req.body;
  try {
    const newAppointment = new Appointment({ name, phoneNumber, clinic, selectedService, selectedDoctor, date, timeSlot });
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Failed to book appointment' });
  }
};

// Controller to get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('clinic', 'name image description')
      .populate('selectedDoctor', 'name image description');
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

import Doctor from '../models/Doctor.js';

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('clinic');
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
};

export const createDoctor = async (req, res) => {
  const { name, description, image, clinic } = req.body;
  try {
    const newDoctor = new Doctor({ name, description, image, clinic });
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor created successfully' });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ message: 'Failed to create doctor' });
  }
};

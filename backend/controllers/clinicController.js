import Clinic from '../models/Clinic.js';

export const getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (error) {
    console.error('Error fetching clinics:', error);
    res.status(500).json({ message: 'Failed to fetch clinics' });
  }
};

export const createClinic = async (req, res) => {
  const { name, description, image } = req.body;
  try {
    const newClinic = new Clinic({ name, description, image });
    await newClinic.save();
    res.status(201).json({ message: 'Clinic created successfully' });
  } catch (error) {
    console.error('Error creating clinic:', error);
    res.status(500).json({ message: 'Failed to create clinic' });
  }
};

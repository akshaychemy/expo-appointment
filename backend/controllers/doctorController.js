import Doctor from '../models/Doctor.js';
import upload from '../middleware/fileUpload.js';
import multer from 'multer';

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
  try {
    upload.single('image')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'File upload error', error: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }

      const { name, description, clinic } = req.body;
      const imagePath = req.file.path; // Path to uploaded image file

      const newDoctor = new Doctor({
        name,
        image: imagePath, // Store file path in 'image' field
        description,
        clinic // Assuming clinic is provided as ObjectId
      });

      await newDoctor.save();
      res.status(201).json(newDoctor);
    });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ message: 'Error creating doctor', error: error.message });
  }
};
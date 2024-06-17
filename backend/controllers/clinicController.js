import Clinic from '../models/Clinic.js';
import upload from '../middleware/fileUpload.js';
import multer from 'multer';
import path from 'path';


export const getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (error) {
    console.error('Error fetching clinics:', error);
    res.status(500).json({ message: 'Failed to fetch clinics' });
  }
};


const createClinic = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'File upload error', error: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }

      const { name, description } = req.body;
      const imagePath = req.file.path; // Path to uploaded image file
      const filename = path.basename(imagePath);
      console.log("imagePath",filename)

      const newClinic = new Clinic({
        name,
        image: filename, // Store file path in 'image' field
        description,
      });

      await newClinic.save();
      res.status(201).json(newClinic);
    });
  } catch (error) {
    console.error('Error creating clinic:', error);
    res.status(500).json({ message: 'Error creating clinic', error: error.message });
  }
};

export { createClinic };


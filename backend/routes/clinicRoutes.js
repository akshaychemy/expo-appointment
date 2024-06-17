import express from 'express';
import { createClinic, getClinics } from '../controllers/clinicController.js';
import { protect, superUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Import multer middleware
import upload from '../middleware/fileUpload.js';

// router.get('/', protect, getClinics);
router.get('/', getClinics);
router.post('/', protect, superUser, createClinic);

export default router;

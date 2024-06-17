import express from 'express';
import { createClinic, getClinics } from '../controllers/clinicController.js';
import { protect, superUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getClinics);
router.post('/', protect, superUser, createClinic);

export default router;

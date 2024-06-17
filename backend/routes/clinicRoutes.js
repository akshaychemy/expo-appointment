import express from 'express';
import { getClinics, createClinic } from '../controllers/clinicController.js';

const router = express.Router();

router.get('/', getClinics);
router.post('/', createClinic);

export default router;

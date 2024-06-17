import express from 'express';
import { bookAppointment, getAppointments } from '../controllers/appointmentController.js';

const router = express.Router();

// Route to book a new appointment
router.post('/', bookAppointment);

// Route to get all appointments
router.get('/', getAppointments);

export default router;

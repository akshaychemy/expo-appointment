import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { registerUser } from './controllers/authController.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
import appointmentRoutes from './routes/appointmentRoutes.js';
import clinicRoutes from './routes/clinicRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use('/api/appointments', appointmentRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/users', userRoutes);

app.post('/api/register', registerUser);

app.get('/', (req, res) => {
  res.send('Welcome to the appointment booking backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

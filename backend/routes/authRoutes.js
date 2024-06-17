import express from 'express';
import { registerSuperUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register-superuser', registerSuperUser);
router.post('/login', loginUser);

export default router;

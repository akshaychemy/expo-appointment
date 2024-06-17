import express from 'express';
import { createSuperUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/superuser', createSuperUser);
router.post('/login', loginUser);

export default router;

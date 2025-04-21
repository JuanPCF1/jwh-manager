import express from 'express';
import { createAdminController } from '../controllers/adminController.js';

const router = express.Router();

router.post('/api/admin', createAdminController);

export default router;

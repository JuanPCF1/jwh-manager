import express from 'express';
import { createAdminController } from '../controllers/adminController.js';
import { deleteAdminController } from '../controllers/adminController.js';

const router = express.Router();

router.post('/api/admin/create', createAdminController);
router.delete('/api/admin/delete/:Username', deleteAdminController);

export default router;

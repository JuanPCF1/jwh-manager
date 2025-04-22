import express from 'express';
import { createAdminController } from '../controllers/adminController.js';
import { deleteAdminController } from '../controllers/adminController.js';
import { getAllAdminController } from '../controllers/adminController.js';

const router = express.Router();

router.post('/api/admin/create', createAdminController);
router.delete('/api/admin/delete/:Username', deleteAdminController);
router.get('/api/admin/getAll', getAllAdminController);

export default router;

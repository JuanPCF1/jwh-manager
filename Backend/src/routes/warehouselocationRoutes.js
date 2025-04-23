import express from 'express';

import { createWarehouseLocationController } from '../controllers/warehouselocationController.js';
import { deleteWarehouseLocationController } from '../controllers/warehouselocationController.js';
import { getAllWarehouseLocationController } from '../controllers/warehouselocationController.js';
import { filterWarehouseLocationController } from '../controllers/warehouselocationController.js';

const router = express.Router();

router.post('/api/warehouselocation/create', createWarehouseLocationController);
router.delete('/api/warehouselocation/delete/:Location_ID', deleteWarehouseLocationController);
router.get('/api/warehouselocation/getAll', getAllWarehouseLocationController);
router.get('/api/warehouselocation/filter', filterWarehouseLocationController);

export default router;
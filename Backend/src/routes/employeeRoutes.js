import express from 'express';

import { createEmployeeController } from '../controllers/employeeController.js';
import { deleteEmployeeController } from '../controllers/employeeController.js';

const router = express.Router();

router.post('/api/employee/create', createEmployeeController);
router.delete('/api/employee/delete/:Employee_ID', deleteEmployeeController);

export default router;
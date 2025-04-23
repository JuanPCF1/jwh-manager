import express from 'express';

import { createEmployeeController } from '../controllers/employeeController.js';
import { deleteEmployeeController } from '../controllers/employeeController.js';
import { getAllEmployeeController } from '../controllers/employeeController.js';
import { updateEmployeeController } from '../controllers/employeeController.js';

const router = express.Router();

router.post('/api/employee/create', createEmployeeController);
router.delete('/api/employee/delete/:Employee_ID', deleteEmployeeController);
router.get('/api/employee/getAll', getAllEmployeeController);
router.patch('/api/employee/update/:Employee_ID', updateEmployeeController);


export default router;
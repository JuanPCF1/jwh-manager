import express from 'express';
import { createCompanyController } from '../controllers/companyController.js';
import { deleteCompanyController } from '../controllers/companyController.js';

const router = express.Router();

router.post('/api/company/create', createCompanyController);
router.delete('/api/company/delete/:Company_Name', deleteCompanyController);

export default router;

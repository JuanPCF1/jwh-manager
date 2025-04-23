import express from 'express';
import { createCompanyController } from '../controllers/companyController.js';
import { deleteCompanyController } from '../controllers/companyController.js';
import { getAllCompanyController } from '../controllers/companyController.js';
import { getCompanyBySimilarityController } from '../controllers/companyController.js';

const router = express.Router();

router.post('/api/company/create', createCompanyController);
router.delete('/api/company/delete/:Company_Name', deleteCompanyController);
router.get('/api/company/getAll', getAllCompanyController);
router.get('/api/company/getBySimilarity/:Company_Name', getCompanyBySimilarityController);
router.get('/api/company/getBySimilarity', getCompanyBySimilarityController)

export default router;

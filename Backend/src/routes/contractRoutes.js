import express from 'express';
import { createContractController } from '../controllers/contractController.js';
import { deleteContractController } from '../controllers/contractController.js';
import { getAllContractsController } from '../controllers/contractController.js';

const router = express.Router();

router.post('/api/contract/create', createContractController);
router.delete('/api/contract/delete/:Job_Number', deleteContractController);
router.get('/api/contract/all', getAllContractsController);

export default router;

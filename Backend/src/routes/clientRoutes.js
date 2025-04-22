import express from 'express';
import { createClientController } from '../controllers/clientController.js';
import { deleteClientController } from '../controllers/clientController.js';
import { getAllClientController } from '../controllers/clientController.js';

const router = express.Router();

router.post('/api/client/create', createClientController);
router.delete('/api/client/delete/:ID', deleteClientController);
router.get('/api/client/getAll', getAllClientController); 

export default router;

import express from 'express';
import { createClientController } from '../controllers/clientController.js';
import { deleteClientController } from '../controllers/clientController.js';


const router = express.Router();

router.post('/api/client/create', createClientController);
router.delete('/api/client/delete/:ID', deleteClientController);

export default router;

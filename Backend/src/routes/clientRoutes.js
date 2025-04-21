import express from 'express';
import { createClientController } from '../controllers/clientController.js';
import { deleteClientController } from '../controllers/clientController.js';


const router = express.Router();

router.post('/api/client/create', createClientController);
router.post('/api/client/delete', deleteClientController);

export default router;

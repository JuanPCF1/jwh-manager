import express from 'express';
import { createContentController } from '../controllers/contentController.js';
import { deleteContentController } from '../controllers/contentController.js';


const router = express.Router();

router.post('/api/content/create', createContentController);
router.delete('/api/content/delete/:Container_ID', deleteContentController);

export default router;

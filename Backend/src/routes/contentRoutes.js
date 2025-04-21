import express from 'express';
import { createContentController } from '../controllers/contentController.js';

const router = express.Router();

router.post('/api/content/create', createContentController);

export default router;

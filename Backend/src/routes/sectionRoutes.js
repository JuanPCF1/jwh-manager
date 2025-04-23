import express from 'express';

import { createSectionController } from '../controllers/sectionController.js';
import { deleteSectionController } from '../controllers/sectionController.js';
import { getAllSectionController } from '../controllers/sectionController.js';
import { filterSectionController } from '../controllers/sectionController.js';

const router = express.Router();

router.post('/api/section/create', createSectionController);
router.delete('/api/section/delete/:Section_ID', deleteSectionController);
router.get('/api/section/getAll', getAllSectionController);
router.get('/api/section/filter', filterSectionController);

export default router;
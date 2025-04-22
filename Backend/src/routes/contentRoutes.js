import express from 'express';
import { createContentController } from '../controllers/contentController.js';
import { deleteContentController } from '../controllers/contentController.js';
import { getAllContentController } from '../controllers/contentController.js';
import { filterContentController } from '../controllers/contentController.js';


const router = express.Router();

router.post('/api/content/create', createContentController);
router.delete('/api/content/delete/:Container_ID', deleteContentController);
router.get('/api/content/getAll', getAllContentController);


// /api/content/filter?Client_ID=xxxx&Section_ID=xxxx&Job%23=xxxx&Status=xxxx
// to use filters when calling the request replace xxxx with respective values you wish to filter by.
// For example: 
// /api/content/filter?Client_ID=10&Section_ID=1&Job%23=25&Status=Completed

router.get('/api/content/filter', filterContentController);

export default router;

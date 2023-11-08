import express from 'express';
import { createVisit, getVisits } from '../controllers/visitsController.js';

const router = express.Router();

router.post('/visits', createVisit);
router.get('/visits', getVisits);

export default router;

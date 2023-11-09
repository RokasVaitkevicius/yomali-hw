import express from 'express';
import { createVisit, getVisits } from '../controllers/visitsController.js';
import { validateSchema } from '../middleware/validation/index.js';
import { createVisitSchema } from '../middleware/validation/schemas/index.js';
import apiKeyAuth from '../middleware/apiKeyAuth.js';

const router = express.Router();

router.post('/visits', validateSchema(createVisitSchema), createVisit);
router.get('/visits', apiKeyAuth, getVisits);

export default router;

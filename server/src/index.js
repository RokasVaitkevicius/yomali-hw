import Express from 'express';
import cors from 'cors';
import { HTTP_PORT } from './services/config.js';
import { db } from './db/index.js';
import healthRouter from './routes/healthRoutes.js';
import visitRouter from './routes/visitsRoutes.js';

const express = Express();

express.use(Express.json());

express.use(cors());

await db.init();

express.use('/', healthRouter);
express.use('/', visitRouter);

express.listen(HTTP_PORT, () => {
  console.log(`Example app listening on port ${HTTP_PORT}`);
});

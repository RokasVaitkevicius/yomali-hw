import Express from 'express';
import { HTTP_PORT } from './services/config.js';
import { db } from './db/index.js';

const express = Express();

express.use(Express.json());

await db.init();

express.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

express.listen(HTTP_PORT, () => {
  console.log(`Example app listening on port ${HTTP_PORT}`);
});

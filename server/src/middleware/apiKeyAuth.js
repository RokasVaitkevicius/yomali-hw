import { db } from '../db/index.js';

export default async function apiKeyAuth(req, res, next) {
  let apiKey = req.header('x-api-key');

  if (!apiKey) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  // TODO: could be cached to redis for example
  const org = await db.sequelize.models.Org.findOne({ where: { apiKey } });

  if (org) {
    req.org = org;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

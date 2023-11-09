import { CLIENT_API_KEY } from '../services/config.js';

export default function apiKeyAuth(req, res, next) {
  let apiKey = req.header('x-api-key');

  // TODO: currently it's just a simplistic single tenant approach
  if (apiKey === CLIENT_API_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

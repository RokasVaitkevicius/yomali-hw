import { db } from '../db/index.js';
import { visitsQueue } from '../services/visitsQueue.js';

export async function createVisit(req, res) {
  try {
    const { identifier, pageUrl, visitedAt } = req.body;

    visitsQueue.push({ identifier, pageUrl, visitedAt });

    res.status(202).json({ message: 'Visit logged' });
  } catch (error) {
    console.error('Error logging visit:', error);
    res.status(500).json({ message: 'Error logging visit' });
  }
}

export async function getVisits(req, res) {
  try {
    const aggregationsConfig = {
      minute: {
        defaultFrom: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
        defaultTo: new Date(),
        maxRange: 24 * 60 * 60 * 1000, // 24 hours
      },
      hour: {
        defaultFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        defaultTo: new Date(),
        maxRange: 7 * 24 * 60 * 60 * 1000, // 7 days
      },
      day: {
        defaultFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        defaultTo: new Date(),
        maxRange: 30 * 24 * 60 * 60 * 1000, // 30 days
      },
      month: {
        defaultFrom: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 365 days ago
        defaultTo: new Date(),
        maxRange: 365 * 24 * 60 * 60 * 1000, // 365 days
      },
    };

    const aggregation = req.query.aggregation || 'minute';

    const { defaultFrom, defaultTo } = aggregationsConfig[aggregation];

    // TODO: add url params validation middleware
    const from = req.query.from ? new Date(req.query.from) : defaultFrom;
    const to = req.query.to ? new Date(req.query.to) : defaultTo;

    const visits = await db.sequelize.models.Visit.findAll({
      attributes: [
        [db.sequelize.fn('date_trunc', aggregation, db.sequelize.col('created_at')), 'aggregation'],
        [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'visit_count'],
        'page_url',
      ],
      where: {
        visitedAt: {
          [db.Sequelize.Op.gte]: from,
          [db.Sequelize.Op.lte]: to,
        },
      },
      group: ['aggregation', 'page_url'],
      order: [[db.sequelize.col('visit_count'), 'ASC']],
    });

    res.status(200).json({ data: visits });
  } catch (error) {
    console.error('Error getting visits:', error);
    res.status(500).json({ message: 'Error getting visits' });
  }
}

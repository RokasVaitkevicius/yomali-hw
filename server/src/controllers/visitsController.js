import { db } from '../db/index.js';
import { visitsQueue } from '../services/visitsQueue.js';

export async function createVisit(req, res) {
  try {
    const { identifier, pageUrl, visitedAt } = req.body;
    const { org } = req;

    // Push event to a queue for async processing
    visitsQueue.push({ identifier, pageUrl, visitedAt, org });

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

    const aggregation = req.query.aggregation || 'day';

    const { org } = req;

    const { defaultFrom, defaultTo } = aggregationsConfig[aggregation];

    // TODO: add url params validation middleware
    const dateFrom = req.query.dateFrom ? new Date(req.query.dateFrom) : defaultFrom;
    const dateTo = req.query.dateTo ? new Date(req.query.dateTo) : defaultTo;

    const visits = await db.sequelize.models.Visit.scope({ method: ['org', org.id] }).findAll({
      attributes: [
        [db.sequelize.fn('date_trunc', aggregation, db.sequelize.col('visited_at')), 'timeframe'],
        [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'visit_count'],
        'page_url',
      ],
      where: {
        visitedAt: {
          [db.Sequelize.Op.gte]: dateFrom,
          [db.Sequelize.Op.lte]: dateTo,
        },
      },
      group: ['timeframe', 'page_url'],
    });

    const structuredData = visits.reduce((accumulator, current) => {
      const { page_url, timeframe, visit_count } = current.dataValues;

      if (!accumulator[page_url]) {
        accumulator[page_url] = [];
      }

      accumulator[page_url].push({ timeframe, visit_count: parseInt(visit_count, 10) });

      return accumulator;
    }, {});

    res.status(200).json({ data: structuredData });
  } catch (error) {
    console.error('Error getting visits:', error);
    res.status(500).json({ message: 'Error getting visits' });
  }
}

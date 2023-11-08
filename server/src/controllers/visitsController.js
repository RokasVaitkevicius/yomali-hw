import { db } from '../db/index.js';

export async function createVisit(req, res) {
  try {
    const { identifier, pageUrl } = req.body;
    const SEVEN_DAYS_AGO = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);

    const [user, userCreated] = await db.sequelize.models.User.findOrCreate({
      where: { identifier },
      defaults: { identifier },
    });

    let visit = await db.sequelize.models.Visit.findOne({
      where: {
        userId: user.id,
        pageUrl,
        createdAt: {
          [db.Sequelize.Op.gt]: SEVEN_DAYS_AGO,
        },
      },
    });

    if (!visit) {
      visit = await db.sequelize.models.Visit.create({
        userId: user.id,
        pageUrl,
      });

      res.status(201).json({
        message: 'Visit logged successfully',
        user: {
          id: user.id,
          isNewUser: userCreated,
        },
        visit,
      });
    } else {
      res.status(200).json({
        message: 'Recent visit already logged; no new entry created.',
        user: {
          id: user.id,
          isNewUser: userCreated,
        },
        visit,
      });
    }
  } catch (error) {
    console.error('Error logging visit:', error);
    res.status(500).json({ message: 'Error logging visit' });
  }
}

export async function getVisits(req, res) {
  try {
    // 30 days ago
    const defaultFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const defaultTo = new Date();

    // TODO: add url params validation middleware
    const from = req.query.from ? new Date(req.query.from) : defaultFrom;
    const to = req.query.to ? new Date(req.query.to) : defaultTo;

    const timeframe = req.query.timeframe || 'minute';

    const visits = await db.sequelize.models.Visit.findAll({
      attributes: [
        [db.sequelize.fn('date_trunc', timeframe, db.sequelize.col('created_at')), 'timeframe'],
        [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'visit_count'],
        'page_url',
      ],
      where: {
        createdAt: {
          [db.Sequelize.Op.gte]: from,
          [db.Sequelize.Op.lte]: to,
        },
      },
      group: ['timeframe', 'page_url'],
      order: [[db.sequelize.col('timeframe'), 'ASC']],
    });

    res.status(200).json({ data: visits });
  } catch (error) {
    console.error('Error getting visits:', error);
    res.status(500).json({ message: 'Error getting visits' });
  }
}

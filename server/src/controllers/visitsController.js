import { db } from '../db/index.js';

export async function createVisit(req, res) {
  try {
    const { identifier, pageUrl } = req.body;
    const SEVEN_DAYS_AGO = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);

    // Find or create the user based on the identifier
    const [user, userCreated] = await db.sequelize.models.User.findOrCreate({
      where: { identifier },
      defaults: { identifier },
    });

    // Find a visit within the last 7 days
    let visit = await db.sequelize.models.Visit.findOne({
      where: {
        userId: user.id,
        pageUrl,
        createdAt: {
          [db.Sequelize.Op.lt]: SEVEN_DAYS_AGO,
        },
      },
    });

    // If they haven't visited in the last 7 days, or we didn't find a visit, log a new visit
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
      // If the visit is within the last 7 days, don't log a new visit
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
    const visits = await db.sequelize.models.Visit.findAll();

    res.status(200).json({ visits });
  } catch (error) {
    console.error('Error getting visits:', error);
    res.status(500).json({ message: 'Error getting visits' });
  }
}

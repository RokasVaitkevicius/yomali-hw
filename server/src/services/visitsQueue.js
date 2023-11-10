import BetterQueue from 'better-queue';
import { db } from '../db/index.js';

// This queue is used to log visits to the database
// It allows us to control pressure on the database by limiting the number of concurrent connections also bursts of request
// It also helps to keep requests coming from client asynchronous
// I'd use a persistent queue like RabbitMQ or Kafka in production, but in this case I'm using a simple in-memory queue
export const visitsQueue = new BetterQueue(
  async (input, cb) => {
    console.log('Running visits task');

    try {
      const { identifier, pageUrl, visitedAt, org } = input;
      const SEVEN_DAYS_AGO = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);

      const [user] = await db.sequelize.models.User.scope({ method: ['org', org.id] }).findOrCreate({
        where: { identifier },
        defaults: { identifier, orgId: org.id },
      });

      const visit = await db.sequelize.models.Visit.scope({ method: ['org', org.id] }).findOne({
        where: {
          userId: user.id,
          pageUrl,
          visitedAt: {
            [db.Sequelize.Op.gt]: SEVEN_DAYS_AGO,
          },
        },
      });

      if (!visit) {
        await db.sequelize.models.Visit.create({
          userId: user.id,
          orgId: org.id,
          pageUrl,
          visitedAt,
        });

        console.log('Visit logged successfully');
      } else {
        console.log('Recent visit already logged; no new entry created');
      }

      cb(null);
    } catch (e) {
      console.error(`Error logging visit: ${e}`);
      cb(e);
    }
  },
  {
    batchSize: 1,
    concurrent: 1,
    maxRetries: 5,
    retryDelay: 1000,
  }
);

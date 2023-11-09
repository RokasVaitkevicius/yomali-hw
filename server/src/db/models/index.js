'use strict';

import { DataTypes, Sequelize } from 'sequelize';
import config from '../config/config.json' assert { type: 'json' };
import { NODE_ENV } from '../../services/config.js';
import User from './user.js';
import Visit from './visit.js';
import Org from './org.js';

export const db = {};

const init = async () => {
  const { username, password, database, host, dialect } = config[NODE_ENV];

  db.sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
  });

  const OrgsModel = Org(db.sequelize, DataTypes);
  const UsersModel = User(db.sequelize, DataTypes);
  const VisitsModel = Visit(db.sequelize, DataTypes);

  await db.sequelize.sync();
};

db.init = init;
db.Sequelize = Sequelize;

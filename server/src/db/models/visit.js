'use strict';

export default (sequelize, DataTypes) => {
  const Visit = sequelize.define(
    'Visit',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
      },
      orgId: {
        type: DataTypes.INTEGER,
        field: 'org_id',
      },
      pageUrl: {
        type: DataTypes.STRING,
        field: 'page_url',
      },
      visitedAt: {
        type: DataTypes.DATE,
        field: 'visited_at',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
    },
    {
      sequelize,
      tableName: 'visits',
      updatedAt: false,
      indexes: [
        { unique: false, fields: ['user_id'] },
        { unique: false, fields: ['org_id'] },
      ],
      scopes: {
        org(orgId) {
          return {
            where: {
              orgId,
            },
          };
        },
      },
    }
  );

  return Visit;
};

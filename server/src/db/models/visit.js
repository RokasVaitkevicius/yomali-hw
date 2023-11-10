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
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      orgId: {
        type: DataTypes.INTEGER,
        field: 'org_id',
        allowNull: false,
        references: {
          model: 'orgs',
          key: 'id',
        },
      },
      pageUrl: {
        type: DataTypes.TEXT,
        field: 'page_url',
        allowNull: false,
      },
      visitedAt: {
        type: DataTypes.DATE,
        field: 'visited_at',
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'visits',
      updatedAt: false,
      indexes: [
        { unique: false, fields: ['org_id', 'visited_at'] },
        { unique: false, fields: ['user_id'] },
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

'use strict';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      identifier: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
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
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'users',
      updatedAt: false,
      indexes: [
        { unique: true, fields: ['identifier'] },
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

  return User;
};

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
        field: 'identifier',
      },
      orgId: {
        type: DataTypes.INTEGER,
        field: 'org_id',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
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

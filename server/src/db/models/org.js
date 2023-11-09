'use strict';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Org',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      apiKey: {
        type: DataTypes.STRING,
        field: 'api_key',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
    },
    {
      sequelize,
      tableName: 'orgs',
      updatedAt: false,
      indexes: [{ unique: true, fields: ['api_key'] }],
    }
  );

  return User;
};

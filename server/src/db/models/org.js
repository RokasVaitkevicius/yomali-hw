'use strict';

export default (sequelize, DataTypes) => {
  const Org = sequelize.define(
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
        allowNull: false,
        unique: true,
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
      tableName: 'orgs',
      updatedAt: false,
      indexes: [{ unique: true, fields: ['api_key'] }],
    }
  );

  return Org;
};

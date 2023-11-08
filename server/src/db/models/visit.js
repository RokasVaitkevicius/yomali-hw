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
      pageUrl: {
        type: DataTypes.STRING,
        field: 'page_url',
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
      indexes: [{ unique: false, fields: ['user_id'] }],
    }
  );

  return Visit;
};
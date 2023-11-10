'use strict';

const TABLE_NAME = 'orgs';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      apiKey: {
        type: Sequelize.STRING,
        field: 'api_key',
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addIndex(TABLE_NAME, ['api_key'], {
      unique: true,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};

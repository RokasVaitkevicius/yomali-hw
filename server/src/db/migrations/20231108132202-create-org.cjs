'use strict';

const TABLE_NAME = 'orgs';
/** @type {import('sequelize-cli').Migration} */
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
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex(TABLE_NAME, ['api_key'], {
      fields: ['api_key'],
      unique: true,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};

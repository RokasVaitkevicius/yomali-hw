'use strict';

const TABLE_NAME = 'visits';
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
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
      },
      pageUrl: {
        type: Sequelize.STRING,
        field: 'page_url',
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex(TABLE_NAME, ['user_id'], {
      fields: ['user_id'],
      unique: false,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};

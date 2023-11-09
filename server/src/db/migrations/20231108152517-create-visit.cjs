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
      orgId: {
        type: Sequelize.INTEGER,
        field: 'org_id',
      },
      pageUrl: {
        type: Sequelize.TEXT,
        field: 'page_url',
      },
      visitedAt: {
        field: 'visited_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex(TABLE_NAME, ['org_id', 'visited_at'], {
      fields: ['org_id', 'visited_at'],
      unique: false,
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

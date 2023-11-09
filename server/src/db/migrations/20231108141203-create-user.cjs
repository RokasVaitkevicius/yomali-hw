'use strict';

const TABLE_NAME = 'users';
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
      identifier: {
        type: Sequelize.UUID,
        field: 'identifier',
        unique: true,
      },
      orgId: {
        type: Sequelize.INTEGER,
        field: 'org_id',
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex(TABLE_NAME, ['org_id'], {
      fields: ['org_id'],
      unique: false,
    });

    await queryInterface.addIndex(TABLE_NAME, ['identifier'], {
      fields: ['identifier'],
      unique: true,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};

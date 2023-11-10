'use strict';

const TABLE_NAME = 'users';

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
        allowNull: false,
        unique: true,
      },
      orgId: {
        type: Sequelize.INTEGER,
        field: 'org_id',
        allowNull: false,
        references: {
          model: 'orgs',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addIndex(TABLE_NAME, ['org_id'], {
      unique: false,
    });

    await queryInterface.addIndex(TABLE_NAME, ['identifier'], {
      unique: true,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};

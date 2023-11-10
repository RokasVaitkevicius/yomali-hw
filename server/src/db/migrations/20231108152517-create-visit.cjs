'use strict';

const TABLE_NAME = 'visits';

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
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
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
      pageUrl: {
        type: Sequelize.TEXT,
        field: 'page_url',
        allowNull: false,
      },
      visitedAt: {
        type: Sequelize.DATE,
        field: 'visited_at',
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addIndex(TABLE_NAME, ['org_id', 'visited_at'], {
      unique: false,
    });

    await queryInterface.addIndex(TABLE_NAME, ['user_id'], {
      unique: false,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'orgs',
      [
        {
          api_key: '2agp59nwu8nrszm4p6kfriekoeo0s1',
          created_at: new Date(),
        },
        {
          api_key: 'api-key-tenant-b',
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('orgs', null, {});
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'orgs',
      [
        {
          api_key: '2agp59nwu8nrszm4p6kfriekoeo0s1',
        },
        {
          api_key: 'api-key-tenant-b',
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('orgs', null, {});
  },
};

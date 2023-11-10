'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          identifier: '927dc1a1-1feb-427c-b4a8-77f50da251bf',
          org_id: 1,
        },
        {
          identifier: '9c90113e-ed23-44dc-a2bb-e7390edfbd95',
          org_id: 2,
        },
      ],
      {}
    );

    const visits1 = [];
    const visits2 = [];

    // random 10 page names array
    const pageNames = ['home', 'about', 'contact', 'pricing', 'careers', 'blog', 'faq', 'support', 'features', 'docs'];

    for (let i = 0; i < 1000; i++) {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const randomDate = new Date(
        startOfMonth.getTime() + Math.random() * (endOfMonth.getTime() - startOfMonth.getTime())
      );

      visits1.push({
        user_id: 1,
        org_id: 1,
        page_url: `http://example.com/${pageNames[Math.floor(Math.random() * pageNames.length)]}`,
        visited_at: randomDate,
      });

      visits2.push({
        user_id: 2,
        org_id: 2,
        page_url: `http://example.com/${pageNames[Math.floor(Math.random() * pageNames.length)]}`,
        visited_at: randomDate,
      });
    }

    await queryInterface.bulkInsert('visits', visits1, {});
    await queryInterface.bulkInsert('visits', visits2, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

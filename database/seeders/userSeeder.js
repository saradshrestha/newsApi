
'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash a sample password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Insert a demo user into the User table
    return queryInterface.bulkInsert('Users', [{
      username: 'demo_user',
      email: 'demo@example.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the demo user
    return queryInterface.bulkDelete('Users', null, {});
  },
};

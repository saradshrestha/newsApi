'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('News', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensure slug is unique
      },
      category_id:{
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      status:{
        type:Sequelize.ENUM,
        values:['Active','Inactive'],
        allowNull:false,
        defaultValue:"Active"
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      feature_image: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('News');
  }
};
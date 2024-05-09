// Example migration file: migrations/XXXXXXXXXXXXXX-create_users_table.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UploadFiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resize_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ext: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UploadFiles');
  },
};

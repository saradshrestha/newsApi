// models/userModel.js
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(require('../config/database'));
const uploadFile = require('./uploadFile');

class User extends Model{
  static associate(models) {
    // define association here
  }
}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_image_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }

},{
  sequelize,
  modelName: "User"
});

// User.belongsTo(uploadFile, { foreignKey: 'profile_image_id' });

module.exports = User;

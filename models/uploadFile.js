// models/uploadFileModel.js
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(require('../config/database'));
const user = require('./user')

class UploadFile extends Model{
  static associate(models) {
    // define association here
  }
}

UploadFile.init({
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resize_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ext: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  sequelize,
  modelName:"UploadFile"
});



// UploadFile.hasOne(User);` no need to add this.

module.exports = UploadFile;
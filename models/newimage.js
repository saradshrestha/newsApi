'use strict';
const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize(require('../config/database'));


  class NewImage extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  NewImage.init({
    news_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    image_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'NewImage',
  });
  
  
  
  module.exports = NewImage;

'use strict';
const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize(require('../config/database'));


  class NewImage extends Model {
    
    static associate(models) {
      // NewImage.belongsToMany(models.UploadFile, {
      //   through: 'NewImage',
      //   foreignKey: 'image_id',
      //   otherKey: 'news_id',
      //   as: 'news' // Alias for the association
      // });
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
    timestamps: true
  });
  
  
  
  module.exports = NewImage;

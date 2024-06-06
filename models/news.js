'use strict';

const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize(require('../config/database'));
// const Category = require('./category');

class News extends Model {
  static associate(models) {
    News.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category' // Alias for the association
    });

    News.belongsToMany(models.UploadFile, {
      through: models.NewImage,
      foreignKey: 'news_id',
      otherKey: 'image_id',
      as: 'uploadFiles'
    });
  }
}

News.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
  },
  status:{
    type:DataTypes.ENUM,
    values:['Active','Inactive'],
    allowNull:false,
    defaultValue:"Active"
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  feature_image: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  category_id:{
    type: DataTypes.BIGINT,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'News',
});


module.exports = News;
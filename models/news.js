'use strict';

const {Sequelize, DataTypes, Model, ENUM } = require('sequelize');
const sequelize = new Sequelize(require('../config/database'));

  class News extends Model {
    static associate(models) {
      // define association here
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
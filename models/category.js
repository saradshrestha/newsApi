'use strict';
const {Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(require('../config/database'));
const News = require('./news');


  class Category extends Model {
    // static associate(models) {
    //   Category.hasMany(models.News, {
    //   });
    // }
  }
  Category.init({ 
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, 
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
  });



  module.exports = Category;

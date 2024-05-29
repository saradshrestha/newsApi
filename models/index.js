// models/index.js

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as needed

const Category = require('./category'); // Ensure correct import path
const News = require('./news'); // Ensure correct import path

const db = {};

// Add models to the db object
db.Category = Category;
db.News = News;


// Set up associations
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

Category.hasMany(News, {
    foreignKey: 'category_id',
    as: 'news'
});

News.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

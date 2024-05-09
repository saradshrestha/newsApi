'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
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
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
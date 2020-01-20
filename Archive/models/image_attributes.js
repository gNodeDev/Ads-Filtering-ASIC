'use strict';
module.exports = (sequelize, DataTypes) => {
  const image_attributes = sequelize.define('image_attributes', {
    image_name: DataTypes.STRING,
    mode: DataTypes.STRING,
    format: DataTypes.STRING,
    palette: DataTypes.STRING,
    info: DataTypes.STRING
  }, {});
  image_attributes.associate = function(models) {
    // associations can be defined here
  };
  return image_attributes;
};
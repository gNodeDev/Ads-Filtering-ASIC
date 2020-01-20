'use strict';
module.exports = (sequelize, DataTypes) => {
  const image_logo_annotations = sequelize.define('image_logo_annotations', {
    file_id: DataTypes.INTEGER,
    mid: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  image_logo_annotations.associate = function(models) {
    // associations can be defined here
  };
  return image_logo_annotations;
};
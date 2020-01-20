'use strict';
module.exports = (sequelize, DataTypes) => {
  const text_annotations = sequelize.define('text_annotations', {
    file_id: DataTypes.INTEGER,
    locale: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  text_annotations.associate = function(models) {
    // associations can be defined here
  };
  return text_annotations;
};
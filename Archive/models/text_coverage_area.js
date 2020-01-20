'use strict';
module.exports = (sequelize, DataTypes) => {
  const text_coverage_area = sequelize.define('text_coverage_area', {
    file_name: DataTypes.STRING,
    word_area: DataTypes.STRING,
    img_area: DataTypes.STRING,
    text_coverage: DataTypes.STRING,
    text_details: DataTypes.STRING
  }, {});
  text_coverage_area.associate = function(models) {
    // associations can be defined here
  };
  return text_coverage_area;
};
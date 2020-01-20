'use strict';
module.exports = (sequelize, DataTypes) => {
  const text_fulltext_annotations = sequelize.define('text_fulltext_annotations', {
    file_id: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {});
  text_fulltext_annotations.associate = function(models) {
    // associations can be defined here
  };
  return text_fulltext_annotations;
};
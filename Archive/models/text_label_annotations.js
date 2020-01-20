'use strict';
module.exports = (sequelize, DataTypes) => {
  const text_label_annotations = sequelize.define('text_label_annotations', {
    file_id: DataTypes.INTEGER,
    mid: DataTypes.STRING,
    description: DataTypes.STRING,
    score: DataTypes.STRING,
    topicality: DataTypes.STRING
  }, {});
  text_label_annotations.associate = function(models) {
    // associations can be defined here
  };
  return text_label_annotations;
};
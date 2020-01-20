'use strict';
module.exports = (sequelize, DataTypes) => {
  const video_detect_texts = sequelize.define('video_detect_texts', {
    file_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    confidence: DataTypes.STRING
  }, {});
  video_detect_texts.associate = function(models) {
    // associations can be defined here
  };
  return video_detect_texts;
};
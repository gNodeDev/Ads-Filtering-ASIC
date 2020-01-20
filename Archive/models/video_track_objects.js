'use strict';
module.exports = (sequelize, DataTypes) => {
  const video_track_objects = sequelize.define('video_track_objects', {
    file_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    confidence: DataTypes.STRING
  }, {});
  video_track_objects.associate = function(models) {
    // associations can be defined here
  };
  return video_track_objects;
};
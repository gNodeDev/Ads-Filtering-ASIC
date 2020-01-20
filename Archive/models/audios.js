'use strict';
module.exports = (sequelize, DataTypes) => {
  const audios = sequelize.define('audios', {
    file_id: DataTypes.INTEGER,
    transcript: DataTypes.STRING,
    confidence: DataTypes.STRING
  }, {});
  audios.associate = function(models) {
    // associations can be defined here
  };
  return audios;
};
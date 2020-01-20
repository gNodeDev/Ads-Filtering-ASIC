'use strict';
module.exports = (sequelize, DataTypes) => {
  const files = sequelize.define('files', {
    file_name: DataTypes.STRING, 
  }, {
  });
  files.associate = function(models) {
    // associations can be defined here
  };
  return files;
};
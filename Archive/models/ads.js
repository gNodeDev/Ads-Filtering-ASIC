'use strict';
module.exports = (sequelize, DataTypes) => {
  const ads = sequelize.define('ads', {
    file_name: DataTypes.STRING,
    medium_type: DataTypes.STRING,
    publication_name: DataTypes.STRING,
    entity_name: DataTypes.STRING,
    entity_type: DataTypes.STRING,
    pro_or_service_type: DataTypes.STRING
  }, {});
  ads.associate = function(models) {
    // associations can be defined here
  };
  return ads;
};
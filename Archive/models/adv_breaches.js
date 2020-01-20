'use strict';
module.exports = (sequelize, DataTypes) => {
  const adv_breaches = sequelize.define('adv_breaches', {
    file_name: DataTypes.STRING,
    hit_value: DataTypes.STRING,
    entity_type: DataTypes.STRING,
    medium_type:DataTypes.STRING,
    entity_name: DataTypes.STRING,
    product_type: DataTypes.STRING,
    medium_type: DataTypes.STRING,
    rule_id: DataTypes.STRING,
    file:DataTypes.STRING,
    isBreached: DataTypes.STRING
  }, {});
  adv_breaches.associate = function(models) {
    // associations can be defined here
  };
  return adv_breaches;
};
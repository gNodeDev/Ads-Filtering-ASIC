"use strict";
module.exports = (sequelize, DataTypes) => {
  const principle_breaches = sequelize.define(
    "principle_breaches",
    {
      file_name: DataTypes.STRING,
      entity_name: DataTypes.STRING,
      product_type: DataTypes.STRING,
      entity_type: DataTypes.STRING,
      medium_type: DataTypes.STRING,
      hit_value: DataTypes.STRING,
      file: DataTypes.STRING,
      rule_id: DataTypes.STRING,
      isBreached: DataTypes.STRING,
      isPrincipleBreached: DataTypes.STRING
    },
    {}
  );
  principle_breaches.associate = function(models) {
    // associations can be defined here
  };
  return principle_breaches;
};

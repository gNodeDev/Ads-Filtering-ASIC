'use strict';
module.exports = (sequelize, DataTypes) => {
  const indigious = sequelize.define('indigious', {
    Postcode_State: DataTypes.STRING,
    Non_Indigenous: DataTypes.STRING,
    Non_Indigenous_pct: DataTypes.STRING,
    AB_TI_Both: DataTypes.STRING,
    AB_TI_Both_pct: DataTypes.STRING,
    Not_stated: DataTypes.STRING,
    Total: DataTypes.STRING
  }, {
    timestamps:false
  });
  indigious.associate = function(models) {
    // associations can be defined here
  };
  return indigious;
};
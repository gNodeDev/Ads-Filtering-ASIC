'use strict';
module.exports = (sequelize, DataTypes) => {
  const weekly_map_data = sequelize.define('weekly_map_data', {
    Postcode_State: DataTypes.STRING,
    '799': DataTypes.STRING,
    '799_pct': DataTypes.STRING,
    '800_1499': DataTypes.STRING,
    '800_1499_pct': DataTypes.STRING,
    '1500_2999': DataTypes.STRING,
    '1500_2999_pct': DataTypes.STRING,
    '3000_or_more': DataTypes.STRING,
    '3000_pct': DataTypes.STRING,
    Not_stated: DataTypes.STRING,
    Not_applicable: DataTypes.STRING,
    NA_NS: DataTypes.STRING,
    NA_NS_pct: DataTypes.STRING,
    Total: DataTypes.STRING
  }, {
    timestamps: false
  });
  weekly_map_data.associate = function(models) {
    // associations can be defined here
  };
  return weekly_map_data;
};
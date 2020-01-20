'use strict';
module.exports = (sequelize, DataTypes) => {
  const labour_status = sequelize.define('labour_status', {
    Postcode_State: DataTypes.STRING,
    Employed_full_part_away: DataTypes.STRING,
    Employed_full_part_away_pct: DataTypes.STRING,
    Unemployed_pct: DataTypes.STRING,
    NS_NA_NILA: DataTypes.STRING,
    NS_NA_NILA_pct: DataTypes.STRING,
    Total: DataTypes.STRING
  }, {
    timestamps:false
  });
  labour_status.associate = function(models) {
    // associations can be defined here
  };
  return labour_status;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const nsw_qld = sequelize.define('nsw_qld', {
    Postcode_State: DataTypes.STRING,
    '0_19': DataTypes.STRING,
    '0_19_pct': DataTypes.STRING,
    '20_39': DataTypes.STRING,
    '20_39_pct': DataTypes.STRING,
    '40_59': DataTypes.STRING,
    '40_59_pct': DataTypes.STRING,
    '60_plus': DataTypes.STRING,
    '60_plus_pct': DataTypes.STRING,
    Total: DataTypes.STRING
  }, {
    timestamps:false
  });
  nsw_qld.associate = function(models) {
    // associations can be defined here
  };
  return nsw_qld;
};
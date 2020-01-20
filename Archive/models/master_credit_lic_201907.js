'use strict';
module.exports = (sequelize, DataTypes) => {
  const master_credit_lic_201907 = sequelize.define('master_credit_lic_201907', {
    register_name: DataTypes.STRING,
    credit_lic_num: DataTypes.STRING,
    credit_lic_name: DataTypes.STRING,
    credit_lic_start_dt: DataTypes.STRING,
    credit_lic_end_dt: DataTypes.STRING,
    credit_lic_status: DataTypes.STRING,
    credit_lic_abn_acn: DataTypes.STRING,
    credit_lic_afsl_num: DataTypes.STRING,
    credit_lic_status_history: DataTypes.STRING,
    credit_lic_locality: DataTypes.STRING,
    credit_lic_state: DataTypes.STRING,
    credit_lic_pcode: DataTypes.STRING,
    credit_lic_lat: DataTypes.STRING,
    credit_lic_lng: DataTypes.STRING,
    credit_lic_edrs: DataTypes.STRING,
    credit_lic_bn: DataTypes.STRING,
    credit_lic_authorisations: DataTypes.STRING
  }, {});
  master_credit_lic_201907.associate = function(models) {
    // associations can be defined here
  };
  return master_credit_lic_201907;
};
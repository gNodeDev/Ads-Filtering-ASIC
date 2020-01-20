'use strict';
module.exports = (sequelize, DataTypes) => {
  const master_afs_lic_201907s = sequelize.define('master_afs_lic_201907s', {
    register_name: DataTypes.STRING,
    afs_lic_no: DataTypes.STRING,
    afs_lic_name: DataTypes.STRING,
    afs_lic_abn_acn: DataTypes.STRING,
    afs_lic_start_dt: DataTypes.STRING,
    afs_lic_pre_fsr: DataTypes.STRING,
    afs_lic_add_local: DataTypes.STRING,
    afs_lic_add_state: DataTypes.STRING,
    afs_lic_add_pcode: DataTypes.STRING,
    afs_lic_add_country: DataTypes.STRING,
    afs_lic_lat: DataTypes.STRING,
    afs_lic_lng: DataTypes.STRING,
    afs_lic_condition: DataTypes.STRING
  }, {
    timestamps: false

  });
  master_afs_lic_201907s.associate = function(models) {
    // associations can be defined here
  };
  return master_afs_lic_201907s;
};
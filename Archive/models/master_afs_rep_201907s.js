'use strict';
module.exports = (sequelize, DataTypes) => {
  const master_afs_rep_201907s = sequelize.define('master_afs_rep_201907s', {
    register_name: DataTypes.STRING,
    afs_rep_no: DataTypes.STRING,
    afs_lic_no: DataTypes.STRING,
    afs_rep_name: DataTypes.STRING,
    afs_rep_abn: DataTypes.STRING,
    afs_rep_acn: DataTypes.STRING,
    afs_rep_other_role: DataTypes.STRING,
    afs_rep_strt_dt: DataTypes.STRING,
    afs_rep_status: DataTypes.STRING,
    afs_rep_end_dt: DataTypes.STRING,
    afs_rep_add_local: DataTypes.STRING,
    afs_rep_add_state: DataTypes.STRING,
    afs_rep_add_pcode: DataTypes.STRING,
    afs_rep_add_country: DataTypes.STRING,
    afs_rep_cross_endorse: DataTypes.STRING,
    afs_rep_may_appoint: DataTypes.STRING,
    afs_rep_may_appointed_by: DataTypes.STRING,
    fin: DataTypes.STRING,
    deal: DataTypes.STRING,
    apply: DataTypes.STRING,
    genfin: DataTypes.STRING,
    issue: DataTypes.STRING,
    arrange_apply: DataTypes.STRING,
    arrange_issue: DataTypes.STRING,
    arrange_underwr: DataTypes.STRING,
    classes: DataTypes.STRING,
    deal_apply: DataTypes.STRING,
    deal_issue: DataTypes.STRING,
    deal_underwr: DataTypes.STRING,
    idps: DataTypes.STRING,
    market: DataTypes.STRING,
    nonidps: DataTypes.STRING,
    scheme: DataTypes.STRING,
    trustee: DataTypes.STRING,
    wsale: DataTypes.STRING,
    arrange: DataTypes.STRING,
    underwr: DataTypes.STRING,
    afs_rep_same_auth: DataTypes.STRING,
    afs_rep_related_bn: DataTypes.STRING
  }, {
    timestamps:false
  });
  master_afs_rep_201907s.associate = function(models) {
    // associations can be defined here
  };
  return master_afs_rep_201907s;
};
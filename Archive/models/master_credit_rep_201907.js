'use strict';
module.exports = (sequelize, DataTypes) => {
  const master_credit_rep_201907 = sequelize.define('master_credit_rep_201907', {
    register_name: DataTypes.STRING,
    cred_rep_no: DataTypes.STRING,
    cred_lic_no: DataTypes.STRING,
    cred_rep_name: DataTypes.STRING
  }, {
    timestamps: false,
  });
  master_credit_rep_201907.associate = function(models) {
    // associations can be defined here
  };
  return master_credit_rep_201907;
};



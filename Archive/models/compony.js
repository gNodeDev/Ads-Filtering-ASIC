'use strict';
module.exports = (sequelize, DataTypes) => {
  const compony = sequelize.define('compony', {
    compony_name: DataTypes.STRING,
    acn: DataTypes.STRING,
    abn: DataTypes.STRING,
    type: DataTypes.STRING,
    class: DataTypes.STRING,
    sub_class: DataTypes.STRING,
    registration_date: DataTypes.STRING
  }, {
     timestamps: false,
  });
  compony.associate = function(models) {
    // associations can be defined here
  };
  return compony;
};
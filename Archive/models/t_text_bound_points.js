'use strict';
module.exports = (sequelize, DataTypes) => {
  const t_text_bound_points = sequelize.define('t_text_bound_points', {
    text_ann_id: DataTypes.INTEGER,
    point_x: DataTypes.STRING,
    point_y: DataTypes.STRING
  }, {});
  t_text_bound_points.associate = function(models) {
    // associations can be defined here
  };
  return t_text_bound_points;
};
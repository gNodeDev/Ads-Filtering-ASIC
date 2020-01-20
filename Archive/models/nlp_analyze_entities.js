'use strict';
module.exports = (sequelize, DataTypes) => {
  const nlp_analyze_entities = sequelize.define('nlp_analyze_entities', {
    file_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    salience: DataTypes.STRING
  }, {});
  nlp_analyze_entities.associate = function(models) {
    // associations can be defined here
  };
  return nlp_analyze_entities;
};
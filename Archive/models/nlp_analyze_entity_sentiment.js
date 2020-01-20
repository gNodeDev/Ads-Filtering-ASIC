'use strict';
module.exports = (sequelize, DataTypes) => {
  const nlp_analyze_entity_sentiment = sequelize.define('nlp_analyze_entity_sentiment', {
    file_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    salience: DataTypes.STRING
  }, {});
  nlp_analyze_entity_sentiment.associate = function(models) {
    // associations can be defined here
  };
  return nlp_analyze_entity_sentiment;
};
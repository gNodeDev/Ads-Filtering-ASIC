'use strict';
module.exports = (sequelize, DataTypes) => {
  const nlp_analyze_sentiment = sequelize.define('nlp_analyze_sentiment', {
    file_id: DataTypes.INTEGER,
    magnitude: DataTypes.STRING,
    score: DataTypes.STRING
  }, {});
  nlp_analyze_sentiment.associate = function(models) {
    // associations can be defined here
  };
  return nlp_analyze_sentiment;
};
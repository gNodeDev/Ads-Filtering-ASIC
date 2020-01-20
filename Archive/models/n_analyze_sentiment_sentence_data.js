'use strict';
module.exports = (sequelize, DataTypes) => {
  const n_analyze_sentiment_sentence_data = sequelize.define('n_analyze_sentiment_sentence_data', {
    analyze_sentiment_id: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {});
  n_analyze_sentiment_sentence_data.associate = function(models) {
    // associations can be defined here
  };
  return n_analyze_sentiment_sentence_data;
};
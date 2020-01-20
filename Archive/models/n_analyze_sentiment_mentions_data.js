'use strict';
module.exports = (sequelize, DataTypes) => {
  const n_analyze_sentiment_mentions_data = sequelize.define('n_analyze_sentiment_mentions_data', {
    analyze_entity_sent_id: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {});
  n_analyze_sentiment_mentions_data.associate = function(models) {
    // associations can be defined here
  };
  return n_analyze_sentiment_mentions_data;
};
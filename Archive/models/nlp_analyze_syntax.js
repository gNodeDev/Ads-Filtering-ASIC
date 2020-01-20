"use strict";
module.exports = (sequelize, DataTypes) => {
  const nlp_analyze_syntax = sequelize.define(
    "nlp_analyze_syntax",
    {
      file_id: DataTypes.INTEGER,
      text: DataTypes.STRING,
      tag: DataTypes.STRING,
      mood: DataTypes.STRING,
      number: DataTypes.STRING,
      person: DataTypes.STRING,
      tense: DataTypes.STRING,
      aspect: DataTypes.STRING,
      case: DataTypes.STRING,
      form: DataTypes.STRING,
      gender: DataTypes.STRING,
      proper: DataTypes.STRING,
      reciprocity: DataTypes.STRING,
      voice: DataTypes.STRING,
      lemma: DataTypes.STRING
    },
    {}
  );
  nlp_analyze_syntax.associate = function(models) {
    // associations can be defined here
  };
  return nlp_analyze_syntax;
};

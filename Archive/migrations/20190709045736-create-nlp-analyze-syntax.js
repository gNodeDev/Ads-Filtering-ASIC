'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('nlp_analyze_syntaxes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file_id: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      mood: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      person: {
        type: Sequelize.STRING
      },
      tense: {
        type: Sequelize.STRING
      },
      aspect: {
        type: Sequelize.STRING
      },
      case: {
        type: Sequelize.STRING
      },
      form: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      proper: {
        type: Sequelize.STRING
      },
      reciprocity: {
        type: Sequelize.STRING
      },
      voice: {
        type: Sequelize.STRING
      },
      lemma: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('nlp_analyze_syntaxes');
  }
};
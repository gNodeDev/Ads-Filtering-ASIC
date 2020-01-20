'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('labour_statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Postcode_State: {
        type: Sequelize.STRING
      },
      Employed_full_part_away: {
        type: Sequelize.STRING
      },
      Employed_full_part_away_pct: {
        type: Sequelize.STRING
      },
      Unemployed_pct: {
        type: Sequelize.STRING
      },
      NS_NA_NILA: {
        type: Sequelize.STRING
      },
      NS_NA_NILA_pct: {
        type: Sequelize.STRING
      },
      Total: {
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
    return queryInterface.dropTable('labour_statuses');
  }
};
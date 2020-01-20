'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('weekly_map_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Postcode_State: {
        type: Sequelize.STRING
      },
      799: {
        type: Sequelize.STRING
      },
      799 _pct: {
        type: Sequelize.STRING
      },
      800 _1499: {
        type: Sequelize.STRING
      },
      800 _1499_pct: {
        type: Sequelize.STRING
      },
      1500 _2999: {
        type: Sequelize.STRING
      },
      1500 _2999_pct: {
        type: Sequelize.STRING
      },
      3000 _or_more: {
        type: Sequelize.STRING
      },
      3000 _pct: {
        type: Sequelize.STRING
      },
      Not_stated: {
        type: Sequelize.STRING
      },
      Not_applicable: {
        type: Sequelize.STRING
      },
      NA_NS: {
        type: Sequelize.STRING
      },
      NA_NS_pct: {
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
    return queryInterface.dropTable('weekly_map_data');
  }
};
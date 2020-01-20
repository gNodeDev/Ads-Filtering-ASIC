'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('nsw_qlds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Postcode_State: {
        type: Sequelize.STRING
      },
      0 _19: {
        type: Sequelize.STRING
      },
      0 _19_pct: {
        type: Sequelize.STRING
      },
      20 _39: {
        type: Sequelize.STRING
      },
      20 _39_pct: {
        type: Sequelize.STRING
      },
      40 _59: {
        type: Sequelize.STRING
      },
      40 _59_pct: {
        type: Sequelize.STRING
      },
      60 _plus: {
        type: Sequelize.STRING
      },
      60 _plus_pct: {
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
    return queryInterface.dropTable('nsw_qlds');
  }
};
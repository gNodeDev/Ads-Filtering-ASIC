'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('indigious', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Postcode_State: {
        type: Sequelize.STRING
      },
      Non_Indigenous: {
        type: Sequelize.STRING
      },
      Non_Indigenous_pct: {
        type: Sequelize.STRING
      },
      AB_TI_Both: {
        type: Sequelize.STRING
      },
      AB_TI_Both_pct: {
        type: Sequelize.STRING
      },
      Not_stated: {
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
    return queryInterface.dropTable('indigious');
  }
};
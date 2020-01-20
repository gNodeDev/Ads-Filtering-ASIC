'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('master_credit_rep_201907s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      register_name: {
        type: Sequelize.STRING
      },
      cred_rep_no: {
        type: Sequelize.STRING
      },
      cred_lic_no: {
        type: Sequelize.STRING
      },
      cred_rep_name: {
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
    return queryInterface.dropTable('master_credit_rep_201907s');
  }
};
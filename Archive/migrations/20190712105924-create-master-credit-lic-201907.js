'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('master_credit_lic_201907s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      register_name: {
        type: Sequelize.STRING
      },
      credit_lic_num: {
        type: Sequelize.STRING
      },
      credit_lic_name: {
        type: Sequelize.STRING
      },
      credit_lic_start_dt: {
        type: Sequelize.STRING
      },
      credit_lic_end_dt: {
        type: Sequelize.STRING
      },
      credit_lic_status: {
        type: Sequelize.STRING
      },
      credit_lic_abn_acn: {
        type: Sequelize.STRING
      },
      credit_lic_afsl_num: {
        type: Sequelize.STRING
      },
      credit_lic_status_history: {
        type: Sequelize.STRING
      },
      credit_lic_locality: {
        type: Sequelize.STRING
      },
      credit_lic_state: {
        type: Sequelize.STRING
      },
      credit_lic_pcode: {
        type: Sequelize.STRING
      },
      credit_lic_lat: {
        type: Sequelize.STRING
      },
      credit_lic_lng: {
        type: Sequelize.STRING
      },
      credit_lic_edrs: {
        type: Sequelize.STRING
      },
      credit_lic_bn: {
        type: Sequelize.STRING
      },
      credit_lic_authorisations: {
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
    return queryInterface.dropTable('master_credit_lic_201907s');
  }
};
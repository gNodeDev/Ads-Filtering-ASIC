'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('master_afs_lic_201907s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      register_name: {
        type: Sequelize.STRING
      },
      afs_lic_no: {
        type: Sequelize.STRING
      },
      afs_lic_name: {
        type: Sequelize.STRING
      },
      afs_lic_abn_acn: {
        type: Sequelize.STRING
      },
      afs_lic_start_dt: {
        type: Sequelize.STRING
      },
      afs_lic_pre_fsr: {
        type: Sequelize.STRING
      },
      afs_lic_add_local: {
        type: Sequelize.STRING
      },
      afs_lic_add_state: {
        type: Sequelize.STRING
      },
      afs_lic_add_pcode: {
        type: Sequelize.STRING
      },
      afs_lic_add_country: {
        type: Sequelize.STRING
      },
      afs_lic_lat: {
        type: Sequelize.STRING
      },
      afs_lic_lng: {
        type: Sequelize.STRING
      },
      afs_lic_condition: {
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
    return queryInterface.dropTable('master_afs_lic_201907s');
  }
};
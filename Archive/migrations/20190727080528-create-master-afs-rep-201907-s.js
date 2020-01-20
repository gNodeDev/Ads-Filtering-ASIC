'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('master_afs_rep_201907s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      register_name: {
        type: Sequelize.STRING
      },
      afs_rep_no: {
        type: Sequelize.STRING
      },
      afs_lic_no: {
        type: Sequelize.STRING
      },
      afs_rep_name: {
        type: Sequelize.STRING
      },
      afs_rep_abn: {
        type: Sequelize.STRING
      },
      afs_rep_acn: {
        type: Sequelize.STRING
      },
      afs_rep_other_role: {
        type: Sequelize.STRING
      },
      afs_rep_strt_dt: {
        type: Sequelize.STRING
      },
      afs_rep_status: {
        type: Sequelize.STRING
      },
      afs_rep_end_dt: {
        type: Sequelize.STRING
      },
      afs_rep_add_local: {
        type: Sequelize.STRING
      },
      afs_rep_add_state: {
        type: Sequelize.STRING
      },
      afs_rep_add_pcode: {
        type: Sequelize.STRING
      },
      afs_rep_add_country: {
        type: Sequelize.STRING
      },
      afs_rep_cross_endorse: {
        type: Sequelize.STRING
      },
      afs_rep_may_appoint: {
        type: Sequelize.STRING
      },
      afs_rep_may_appointed_by: {
        type: Sequelize.STRING
      },
      fin: {
        type: Sequelize.STRING
      },
      deal: {
        type: Sequelize.STRING
      },
      apply: {
        type: Sequelize.STRING
      },
      genfin: {
        type: Sequelize.STRING
      },
      issue: {
        type: Sequelize.STRING
      },
      arrange_apply: {
        type: Sequelize.STRING
      },
      arrange_issue: {
        type: Sequelize.STRING
      },
      arrange_underwr: {
        type: Sequelize.STRING
      },
      classes: {
        type: Sequelize.STRING
      },
      deal_apply: {
        type: Sequelize.STRING
      },
      deal_issue: {
        type: Sequelize.STRING
      },
      deal_underwr: {
        type: Sequelize.STRING
      },
      idps: {
        type: Sequelize.STRING
      },
      market: {
        type: Sequelize.STRING
      },
      nonidps: {
        type: Sequelize.STRING
      },
      scheme: {
        type: Sequelize.STRING
      },
      trustee: {
        type: Sequelize.STRING
      },
      wsale: {
        type: Sequelize.STRING
      },
      arrange: {
        type: Sequelize.STRING
      },
      underwr: {
        type: Sequelize.STRING
      },
      afs_rep_same_auth: {
        type: Sequelize.STRING
      },
      afs_rep_related_bn: {
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
    return queryInterface.dropTable('master_afs_rep_201907s');
  }
};
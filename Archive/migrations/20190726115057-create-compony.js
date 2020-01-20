'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('componies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      compony_name: {
        type: Sequelize.STRING
      },
      acn: {
        type: Sequelize.STRING
      },
      abn: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      class: {
        type: Sequelize.STRING
      },
      sub_class: {
        type: Sequelize.STRING
      },
      registration_date: {
        type: Sequelize.STRING
      },
   
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('componies');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file_name: {
        type: Sequelize.STRING
      },
      medium_type: {
        type: Sequelize.STRING
      },
      publication_name: {
        type: Sequelize.STRING
      },
      entity_name: {
        type: Sequelize.STRING
      },
      entity_type: {
        type: Sequelize.STRING
      },
      pro_or_service_type: {
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
    return queryInterface.dropTable('ads');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.TEXT
      },
      lat: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.STRING
      },
      condition: {
        type: Sequelize.STRING
      },
      bikeType: {
        type: Sequelize.STRING
      },
      barnd: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      kmRun: {
        type: Sequelize.INTEGER
      },
      cc: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.TEXT
      },
      details: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      contactName: {
        type: Sequelize.STRING
      },
      contactPhone: {
        type: Sequelize.STRING
      },
      contactEmail: {
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
    return queryInterface.dropTable('Posts');
  }
};
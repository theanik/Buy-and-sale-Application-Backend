'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShowroomDetails = sequelize.define('ShowroomDetails', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    coverPhoto: DataTypes.TEXT,
    profilePhoto: DataTypes.TEXT,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {});
  ShowroomDetails.associate = function(models) {
    // associations can be defined here
  };
  return ShowroomDetails;
};
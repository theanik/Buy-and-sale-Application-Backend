'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    location: DataTypes.TEXT,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    condition: DataTypes.STRING,
    bikeType: DataTypes.STRING,
    barnd: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.STRING,
    kmRun: DataTypes.INTEGER,
    cc: DataTypes.STRING,
    image : DataTypes.TEXT,
    details : DataTypes.TEXT,
    description: DataTypes.TEXT,
    contactName: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    contactEmail: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Post;
};
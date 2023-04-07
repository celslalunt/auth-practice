'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    birthDate: {
      type: DataTypes.DATEONLY
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female")
    }
  }, {
    sequelize,
    modelName: 'Profile',
    timestamps: false
  });
  return Profile;
};
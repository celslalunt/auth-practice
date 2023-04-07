'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, {
        foreignKey: {
            name: "admin_id"
        }
      });
      Event.hasMany(models.Transaction, {
        foreignKey: {
            name: "event_id"
        }
      });
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_ticket: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remaining_ticket: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Event',
    timestamps: true
  });
  return Event;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: {
            name: "user_id"
        }
      });
      Transaction.belongsTo(models.Event, {
        foreignKey: {
            name: "event_id"
        }
      });
    }
  }
  Transaction.init({
    ticket_qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Transaction',
    timestamps: true
  });
  return Transaction;
};
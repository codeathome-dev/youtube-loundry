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
    }
  }
  Transaction.init({
    code: DataTypes.STRING,
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    customer: DataTypes.INTEGER,
    deadline: DataTypes.DATE,
    time: DataTypes.STRING,
    notes: DataTypes.STRING,
    users: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
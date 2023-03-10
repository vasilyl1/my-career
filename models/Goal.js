const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Goal extends Model {}

Goal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    advice: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0,
      unique: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'goal'
  }
);

module.exports = Goal;

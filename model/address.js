const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100],
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 50],
        notEmpty: true,
      },
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50],
        notEmpty: true,
      },
    },
    postalCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [1, 20],
        notEmpty: true,
      },
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50],
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.ENUM("shipping", "billing"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
  },
  {
    tableName: "Addresses",
    timestamps: true,
  }
);
module.exports = Address;
const { DataTypes } = require("sequelize");
const sequelize      = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    items: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      validate: {
        isValidArray(value) {
          if (!Array.isArray(value)) {
            throw new Error("Items must be an array");
          }
          for (const item of value) {
            if (
              typeof item.productId !== "string" ||
              !item.productId.length ||
              typeof item.quantity !== "number" ||
              item.quantity < 1
            ) {
              throw new Error(
                "Each item must have a valid productId and quantity ≥ 1"
              );
            }
          }
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "carts",
    timestamps: false,
  }
);

module.exports = Cart;

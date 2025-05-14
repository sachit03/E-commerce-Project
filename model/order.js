const { DataTypes } = require("sequelize");
const sequelize      = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const Order = sequelize.define(
  "Order",
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
              typeof item.cartId !== "string" ||
              typeof item.productId !== "string" ||
              typeof item.quantity !== "number" ||
              item.quantity < 1 ||
              typeof item.price !== "number" ||
              item.price < 0
            ) {
              throw new Error(
                "Each item needs valid cartId, productId, quantity≥1, price≥0"
              );
            }
          }
        },
      },
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
    paymentIntentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "requires_payment",
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled"
      ),
      defaultValue: "pending",
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.UUID,    
      allowNull: false,
    },
    billingAddress: {
      type: DataTypes.UUID,
      allowNull: false,
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
    tableName: "Orders",
    timestamps: false,
  }
);

module.exports = Order;

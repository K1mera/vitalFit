const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order_line",
    {
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

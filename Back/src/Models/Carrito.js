const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Carrito",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      Cantidad: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};

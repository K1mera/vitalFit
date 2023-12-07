const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Productos", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: { min: 0, max: 5 },
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  });
};

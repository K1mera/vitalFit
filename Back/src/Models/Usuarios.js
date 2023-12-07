const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

moudele.exports = (sequelize) => {
  sequelize.define(
    "Usuario",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      usuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        alowNull: false,
        validate: {
          len: [6, 255],
        },
      },
    },
    { timestamps: false }
  );
};

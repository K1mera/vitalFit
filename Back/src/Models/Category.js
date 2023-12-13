const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.ENUM([
          "Proteína",
          "Creatina",
          "Aminoácidos",
          "Energía",
          "Control de peso",
        ]),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

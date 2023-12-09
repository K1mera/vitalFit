// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//   sequelize.define(
//     "Productos",
//     {
//       id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       description: {
//         type: DataTypes.TEXT,
//       },
//       imageUrl: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//       },
//       price: {
//         type: DataTypes.DECIMAL(8, 2),
//         allowNull: false,
//       },
//       rating: {
//         type: DataTypes.FLOAT,
//         validate: { min: 0, max: 5 },
//       },
//       stock: {
//         type: DataTypes.INTEGER,
//       },
//       amount: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       size: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       timestamps: false,
//     }
//   );
// };

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      flavour: {
        type: DataTypes.STRING,
        defaultValue: "Neutral",
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    { timestamps: false }
  );
};

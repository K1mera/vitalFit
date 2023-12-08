require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { userInfo } = require("os");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/vitalfit`,
  { logging: false, native: false }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/Models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/Models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//Agregar los modelos con primera letra en mayúscula
/* const {Dog, Temperaments} = sequelize.models; */
const {
  Product,
  Category,
  Order,
  User,
  Order_Line,
  Review,
  subCategory,
  Address,
} = sequelize.models;

//Relaciones de modelos
/* Dog.belongsToMany(Temperament, {through: "dog_temp"})
Temperament.belongsToMany(Dog, { through: "dog_temp" }); */

//Relación producto - orden (agregando tabla intermedia con cantidades)
Product.belongsToMany(Order, { through: Order_Line });
Order.belongsToMany(Product, { through: Order_Line });

//Relación reviews - product
Product.hasMany(Review);
Review.belongsTo(Product);

//Relación review - user
User.hasMany(Review);
Review.belongsTo(User);

//Relación productos - categorias
Product.hasOne(Category);
Category.belongsToMany(Product);

//Relación categorías - subCategorías
Category.hasMany(subCategory);
subCategory.belongsTo(Category);

//Relación ordenes - usuario
User.hasMany(Order);
Order.belongsTo(User);

//Relación usuario - dirección
User.hasOne(Address);
Address.belongsTo(User);

//importación de modelos y bdd
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};

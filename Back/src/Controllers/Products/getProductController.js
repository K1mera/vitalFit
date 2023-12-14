const { Op } = require("sequelize");
const { Product, Category, Review } = require("../../db");
const getProducts = async (
  category,
  maxPrice,
  minPrice,
  sortByName,
  sortByPrice
) => {
  let filters = {};

  if (category) {
    const cat = await Category.findOne({ where: { name: category } });

    filters = { ...filters, CategoryId: cat.id };
  }

  //si están los dos es porque se estableció un rango de precios
  if (maxPrice && minPrice) {
    filters = { ...filters, price: { [Op.between]: [minPrice, maxPrice] } };
  } else if (minPrice) {
    filters = { ...filters, price: { [Op.gte]: minPrice } };
  } else if (maxPrice) {
    filters = { ...filters, price: { [Op.lte]: maxPrice } };
  }

  let orderOptions = [];

  if (sortByName === "ASC") {
    orderOptions.push(["name", "ASC"]);
  } else if (sortByName === "DESC") {
    orderOptions.push(["name", "DESC"]);
  }

  if (sortByPrice === "ASC") {
    orderOptions.push(["price", "ASC"]);
  } else if (sortByPrice === "DESC") {
    orderOptions.push(["price", "DESC"]);
  }
  if (orderOptions.length === 0) {
    orderOptions.push(["id", "ASC"]);
  }

  const finds = await Product.findAll({
    where: { ...filters },
    order: orderOptions,
    include: [
      { model: Category, attributes: ["name"] },
      { model: Review, attributes: ["title", "rate", "content"] },
    ],
  });

  if (!finds) throw new Error("No hay productos en la base de datos");

  const nameCat = await finds.map((prod) => {
    const categoryName = prod.Category ? prod.Category.name : null;
    return { ...prod.get(), Category: categoryName };
  });

  return nameCat;
};

module.exports = getProducts;

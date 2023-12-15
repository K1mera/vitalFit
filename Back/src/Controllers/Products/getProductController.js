const { Op } = require("sequelize");
const { Product, Category, Review } = require("../../db");
const getProducts = async (
  search,
  category,
  minPrice,
  maxPrice,
  sortByName,
  sortByPrice,
  offer,
  status
) => {
  let filters = {};

  if (search) {
    filters = { ...filters, name: { [Op.iLike]: `%${search}%` } };
  }

  if (offer) {
    filters = { ...filters, offer: true };
  }
  if (status) {
    filters = { ...filters, status: { [Op.iLike]: status } };
  }

  if (category) {
    const cat = await Category.findOne({
      where: { name: { [Op.iLike]: category } },
    });

    filters = { ...filters, CategoryId: cat.id };
  }

  //si están los dos es porque se estableció un rango de precios
  if (maxPrice && minPrice) {
    console.log(maxPrice, "max");
    console.log(minPrice, "min");

    filters = { ...filters, price: { [Op.between]: [minPrice, maxPrice] } };
  } else if (minPrice) {
    filters = { ...filters, price: { [Op.gte]: minPrice } };
  } else if (maxPrice) {
    filters = { ...filters, price: { [Op.lte]: maxPrice } };
  }

  let orderOptions = [];

  if (sortByName && ["ASC", "DESC"].includes(sortByName.toUpperCase())) {
    orderOptions.push(["name", sortByName.toUpperCase()]);
  }

  if (sortByPrice && ["ASC", "DESC"].includes(sortByPrice.toUpperCase())) {
    orderOptions.push(["price", sortByPrice.toUpperCase()]);
  }

  if (orderOptions.length === 0) {
    orderOptions.push(["id", "ASC"]);
  }

  const finds = await Product.findAll({
    where: filters,
    order: orderOptions,
    include: [
      { model: Category, attributes: ["name"] },
      { model: Review, attributes: ["title", "rate", "content"] },
    ],
  });

  if (!finds) throw new Error("No hay productos en la base de datos");

  const nameCat = await finds.map((prod) => {
    const categoryName = prod.Category ? prod.Category.name : null;
    const arrayDescription = prod.description.split(". ");
    return {
      ...prod.get(),
      Category: categoryName,
      description: arrayDescription,
    };
  });

  return nameCat;
};

module.exports = getProducts;

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
  active
) => {
  let filters = {};

  //buscar por nombre
  if (search) {
    filters = { ...filters, name: { [Op.iLike]: `%${search}%` } };
  }

  //buscar productos en oferta
  if (offer) {
    filters = { ...filters, offer: true };
  }

  //busca productos activos o inactivos según el caso (true o false)
  if (active) {
    filters = { ...filters, active: { [Op.iLike]: active } };
  }

  //busca los productos por categoría
  if (category) {
    //busca el nombre de la categoría y lo busca en el producto con su id
    const cat = await Category.findOne({
      where: { name: { [Op.iLike]: category } },
    });
    filters = { ...filters, CategoryId: cat.id };
  }

  //si están los dos es porque se estableció un rango de precios, se muestran los productos que cumplan con ese rango
  if (maxPrice && minPrice) {
    filters = { ...filters, price: { [Op.between]: [minPrice, maxPrice] } };

    //con uno solo indica que solo se van a mostrar los productos cuyo precio sea mayor al mínimo, o menor al máximo
  } else if (minPrice) {
    filters = { ...filters, price: { [Op.gte]: minPrice } };
  } else if (maxPrice) {
    filters = { ...filters, price: { [Op.lte]: maxPrice } };
  }

  let orderOptions = [];

  //recibe asc o desc de acuerdo al ordenamiento deseado
  if (sortByName && ["ASC", "DESC"].includes(sortByName.toUpperCase())) {
    orderOptions.push(["name", sortByName.toUpperCase()]);
  }

  //recibe asc o desc de acuerdo al ordenamiento deseado
  if (sortByPrice && ["ASC", "DESC"].includes(sortByPrice.toUpperCase())) {
    orderOptions.push(["price", sortByPrice.toUpperCase()]);
  }

  //si no hay ningún criterio de ordenamiento por el usuario, se establece que se ordenen por defecto por id de forma ascendente
  if (orderOptions.length === 0) {
    orderOptions.push(["id", "ASC"]);
  }

  //encuentra los productos filtrando y ordenando por los criterios seleccionados, si no hay ningún filtro
  // simplemente trae todos los productos

  const finds = await Product.findAll({
    where: filters,
    order: orderOptions,
    include: [
      { model: Category, attributes: ["name"] },
      { model: Review, attributes: ["title", "rate", "content"] },
    ],
  });

  if (!finds) throw new Error("No hay productos en la base de datos");

  //Limpia la propiedad categoría para que solo muestre el nombre y no el objeto con su id y su name
  //Además, devuelve la descripción como un array para separar en párrafos
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

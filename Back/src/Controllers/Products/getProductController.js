const { Product, Category, Review } = require("../../db.js");

const getProducts = async () => {
  const products = await Product.findAll({
    include: [
      { model: Category, attributes: ["name"] },
      { model: Review, attributes: ["title", "rate", "content"] },
    ],
  });

  if (!products.length) throw new Error("No hay productos en la base de datos");

  const nameCat = await products.map((prod) => {
    const categoryName = prod.Category ? prod.Category.name : null;
    return { ...prod.get(), Category: categoryName };
  });

  return nameCat;
};
module.exports = getProducts;

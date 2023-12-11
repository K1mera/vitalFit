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
    const cat = prod.Category.name;
    return { ...prod.get(), Category: cat };
  });

  return nameCat;
};
module.exports = getProducts;

const { Product, Category, Review } = require("../../db.js");

const getProductsByIdController = async (id) => {
  const products = await Product.findByPk(id, {
    include: [
      { model: Category, attributes: ["name"] },
      { model: Review, attributes: ["title", "rate", "content"] },
    ],
  });

  if (!products) throw new Error("Éste producto no existe");

  const nameCat = { ...products.get(), Category: products.Category.name };

  return nameCat;
};
module.exports = getProductsByIdController;

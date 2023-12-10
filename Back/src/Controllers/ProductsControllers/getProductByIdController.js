const { Product, Category } = require("../../db.js");

const getProductsByIdController = async (id) => {
  const products = await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: ["name"],
    },
  });

  if (!products.length) throw new Error("Éste producto no existe");

  const nameCat = await products.map((prod) => {
    const cat = prod.Category.name;
    return { ...prod.get(), Category: cat };
  });

  return products;
};
module.exports = getProductsByIdController;

const { Products, Review } = require("../db");

async function getProducts() {
  const products = await Products.findAll({
    include: {
      model: Review,
      attributes: [title, rate, content],
      through: { attributes: [] },
    },
  });
}
module.exports = getProducts;

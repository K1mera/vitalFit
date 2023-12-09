const { Product, Review } = require("../db");

async function getProducts() {
  const products = await Product.findAll();
  return products;
}
module.exports = getProducts;

// {
//   include: {
//     model: Review,
//     attributes: ["title", "rate", "content"],
//     through: { attributes: [] },
//   },
// }

const { Product, Review } = require("../db");

async function getProductById(id) {
  const product = await Product.findByPk(id, {
    include: {
      model: Review,
      attributes: ["title", "rate", "content"],
      through: { attributes: [] },
    },
  });
  return product;
}

module.exports = getProductById;

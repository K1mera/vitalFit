const { Product } = require("../../db");

async function putProduct(id, data) {
  const editProduct = await Product.findByPk(id);
  editProduct.set(data);
  editProduct.save();
  return editProduct;
}

module.exports = putProduct;

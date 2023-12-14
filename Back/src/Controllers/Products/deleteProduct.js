const { Product } = require("../../db");

const deleteProduct = async (id) => {
  const find = await Product.findByPk(id);

  if (!find) throw new Error("Éste producto no éxiste");

  const deletedProduct = await find.destroy();

  return deletedProduct;
};

module.exports = deleteProduct;

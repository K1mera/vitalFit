const { Product } = require("../../db");

const activarDesactivarProducto = async (data) => {
  const { id, status } = data;

  const find = await Product.findByPk(id);

  find.set({ status: status });
  find.save();
  return find;
};

module.exports = activarDesactivarProducto;

const { Product } = require("../../db");

const activarDesactivarProducto = async (id, status) => {
  const find = await Product.findByPk(id);
  if (!find) throw new Error("No se ha podido encontrar el producto");

  find.set({ status: status });
  find.save();
  return find;
};

module.exports = activarDesactivarProducto;

const { Product } = require("../../db");

const activarDesactivarProducto = async (id, active) => {
  const find = await Product.findByPk(id);
  if (!find) throw new Error("No se ha podido encontrar el producto");

  find.set({ active: active });
  find.save();
  return find;
};

module.exports = activarDesactivarProducto;

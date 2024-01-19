const { Product } = require("../../db");

const activarDesactivarProducto = async (id) => {
  const find = await Product.findByPk(id);
  if (!find) throw new Error("No se ha podido encontrar el producto");

  if (find.active) {
    find.set({ active: false });
  } else {
    find.set({ active: true });
  }
  find.save();
  return find;
};

module.exports = activarDesactivarProducto;

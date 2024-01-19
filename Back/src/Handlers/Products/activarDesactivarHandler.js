const activarDesactivarProducto = require("../../Controllers/Products/activarDesactivarProduct");

const activarDesactivarHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await activarDesactivarProducto(id);

    return res
      .status(200)
      .json({ message: "El producto ha sido modificado con éxito" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = activarDesactivarHandler;

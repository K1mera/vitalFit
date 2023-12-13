const activarDesactivarProducto = require("../../Controllers/Products/activarDesactivarProduct");

const activarDesactivarHandler = async (req, res) => {
  const data = req.body;
  try {
    await activarDesactivarProducto(data);
    if (data.status == "Active")
      return res
        .status(200)
        .json({ message: "El producto ha sido activado con éxito" });
    return res
      .status(200)
      .json({ message: "El producto ha sido desactivado con éxito" });
  } catch (error) {}
};

module.exports = activarDesactivarHandler;

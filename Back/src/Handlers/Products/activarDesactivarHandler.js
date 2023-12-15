const activarDesactivarProducto = require("../../Controllers/Products/activarDesactivarProduct");

const activarDesactivarHandler = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  console.log(id);

  try {
    await activarDesactivarProducto(id, active);
    if (active == true)
      return res
        .status(200)
        .json({ message: "El producto ha sido activado con éxito" });
    return res
      .status(200)
      .json({ message: "El producto ha sido desactivado con éxito" });
  } catch (error) {}
};

module.exports = activarDesactivarHandler;

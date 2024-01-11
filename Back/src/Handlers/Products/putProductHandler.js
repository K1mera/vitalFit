const putProduct = require("../../Controllers/Products/putProductController");

async function putProductHandler(req, res) {
  const data = req.body;
  const { id } = req.params;
  try {
    const response = await putProduct(id, data);
    if (!response) throw new Error("No se recibió información nueva");
    res
      .status(200)
      .json({ message: "El producto ha sido modificado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = putProductHandler;

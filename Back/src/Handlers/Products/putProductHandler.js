const putProduct = require("../../Controllers/Products/putProductController");

async function putProductHandler(req, res) {
  const { id, data } = req.body;
  console.log(req.body);
  console.log(data);
  try {
    const response = await putProduct(id, data);
    if (!response) throw new Error("No se recibió información nueva");
    res
      .status(200)
      .json({ message: "El producto ha sido modificado con éxito" });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = putProductHandler;

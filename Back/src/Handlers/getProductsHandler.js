const getProducts = require("../Controllers/getProductsController");

async function getProductsHandler(req, res) {
  try {
    const response = await getProducts();

    if (!response.length)
      throw new Error("No hay productos en la base de datos");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
module.exports = getProductsHandler;

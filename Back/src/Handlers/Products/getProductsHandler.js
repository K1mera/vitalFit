const getProducts = require("../../Controllers/Products/getProductController");

async function getProductsHandler(req, res) {
  try {
    const response = await getProducts();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = getProductsHandler;

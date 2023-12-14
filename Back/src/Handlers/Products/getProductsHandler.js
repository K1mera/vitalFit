const getProducts = require("../../Controllers/Products/getProductController");

async function getProductsHandler(req, res) {
  const { category, minPrice, maxPrice, sortByName, sortByPrice } = req.query;
  try {
    const response = await getProducts(
      category,
      minPrice,
      maxPrice,
      sortByName,
      sortByPrice
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = getProductsHandler;

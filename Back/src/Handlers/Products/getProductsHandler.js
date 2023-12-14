const getProducts = require("../../Controllers/Products/getProductController");

async function getProductsHandler(req, res) {
  const {
    searchByName,
    category,
    minPrice,
    maxPrice,
    sortByName,
    sortByPrice,
    offer,
  } = req.query;
  try {
    const response = await getProducts(
      searchByName,
      category,
      minPrice,
      maxPrice,
      sortByName,
      sortByPrice,
      offer
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = getProductsHandler;

const getProducts = require("../../Controllers/Products/getProductController");

async function getProductsHandler(req, res) {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    sortByName,
    sortByPrice,
    offer,
    active,
  } = req.query;
  try {
    const response = await getProducts(
      search,
      category,
      minPrice,
      maxPrice,
      sortByName,
      sortByPrice,
      offer,
      active
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = getProductsHandler;

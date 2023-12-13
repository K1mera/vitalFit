const postProducts = require("./postManyProductsController");

async function postManyProductsHandler(req, res) {
  try {
    const response = await postProducts();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = postManyProductsHandler;

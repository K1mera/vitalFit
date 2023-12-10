const postProducts = require("./postManyProductsController");

async function postManyProductsHandler(req, res) {
  try {
    const response = await postProducts();
    res.status(200).send("Se cargaron los datos correctamente");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = postManyProductsHandler;

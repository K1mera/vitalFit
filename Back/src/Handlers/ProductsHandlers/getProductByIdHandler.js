const getProductsByIdController = require("../../Controllers/ProductsControllers/getProductByIdController");

const getProductsByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getProductsByIdController(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getProductsByIdHandler;

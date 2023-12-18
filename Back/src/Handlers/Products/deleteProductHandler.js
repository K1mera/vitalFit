const deleteProduct = require("../../Controllers/Products/deleteProduct");

const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProduct(id);
    return res
      .status(200)
      .json({ message: "El producto ha sido eliminado éxitosamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProductHandler;

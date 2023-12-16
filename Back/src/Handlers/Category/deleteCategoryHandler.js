const deleteCategory = require("../../Controllers/Category/deleteCategory");

async function deleteCategoryHandler(req, res) {
  const { id } = req.params;
  try {
    const response = await deleteCategory(id);
    res
      .status(200)
      .json({ message: "La categoria ha sido eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = deleteCategoryHandler;

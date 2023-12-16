const putCategory = require("../../Controllers/Category/putCategory");

async function putCategoryHandler(req, res) {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const response = await putCategory(id, name);
    res
      .status(200)
      .json({ message: "La categoria ha sido modificada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = putCategoryHandler;

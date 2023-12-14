const putCategory = require("../../Controllers/Category/putCategory");

async function putCategoryHandler(req, res) {
  const { id, data } = req.body;
  try {
    const response = await putCategory(id, data);
    res
      .status(200)
      .json({ message: "La categoria ha sido modificada con éxito" });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = putCategoryHandler;

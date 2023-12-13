const postCategory = require("../../Controllers/Category/postCategory");

const postCategoryHandler = async (req, res) => {
  const data = req.body;
  try {
    const response = await postCategory(data);
    return res.status(201).json({ message: "Categoría creada con éxito" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postCategoryHandler;

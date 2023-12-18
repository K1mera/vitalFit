const postProduct = require("../../Controllers/Products/postProductController");

const postProductHandler = async (req, res) => {
  const data = req.body;
  try {
    const response = await postProduct(data);
    return res
      .status(200)
      .json({ message: "El producto ha sido creado éxitosamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postProductHandler;

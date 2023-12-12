const getProductByName = require("../../Controllers/Products/getProductByName");

const getProductByNameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const response = await getProductByName(name);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getProductByNameHandler;

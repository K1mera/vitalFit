const getCategory = require("../../Controllers/Category/getCategory");

const getCategoryHandler = async (req, res) => {
  try {
    const response = await getCategory();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getCategoryHandler;

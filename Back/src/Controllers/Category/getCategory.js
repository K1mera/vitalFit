const { Category } = require("../../db");
const getCategory = async (req, res) => {
  const category = await Category.findAll();
  return res.json(category);
};

module.exports = getCategory;

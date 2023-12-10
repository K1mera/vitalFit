const { SubCategory } = require("../../db");
const getSubCategory = async (req, res) => {
  const category = await SubCategory.findAll();
  return res.json(category);
};

module.exports = getSubCategory;

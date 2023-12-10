const { SubCategory } = require("../../db");
const postSubCategory = async (req, res) => {
  const data = req.body;

  const newCategory = await data.forEach((cat) => {
    SubCategory.findOrCreate({ where: { name: cat.name } });
  });

  return res.json(newCategory);
};

module.exports = postSubCategory;

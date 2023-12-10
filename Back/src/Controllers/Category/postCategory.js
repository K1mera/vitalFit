const { Category } = require("../../db");
const postCategory = async (req, res) => {
  const data = req.body;
  const newCategory = await data.forEach((cat) => {
    Category.findOrCreate({
      where: { name: cat.name },
    });
  });
  return res.json(newCategory);
};

module.exports = postCategory;

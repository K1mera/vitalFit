const { SubCategory, Category } = require("../../db");
const postSubCategory = async (data) => {
  const { name, category } = data;

  const findCat = await Category.findOne({ where: { name: category } });

  const createSub = await SubCategory.create({ name });

  await createSub.setCategory(findCat);

  return createSub;
};

module.exports = postSubCategory;

/* const data = req.body;

const newCategory = await data.forEach((cat) => {
  SubCategory.findOrCreate({ where: { name: cat.name } });
});

return res.json(newCategory); */

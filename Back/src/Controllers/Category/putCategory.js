const { Category } = require("../../db");
const putCategory = async (id, data) => {
  const editCategory = await Category.findByPk(id);
  editCategory.set(data);
  await editCategory.save();
  return editCategory;
};

module.exports = putCategory;

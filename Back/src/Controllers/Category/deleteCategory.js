const { Category } = require("../../db");
const deleteCategory = async (id) => {
  const deletedCategory = await Category.destroy({ where: { id } });
  return deletedCategory;
};

module.exports = deleteCategory;

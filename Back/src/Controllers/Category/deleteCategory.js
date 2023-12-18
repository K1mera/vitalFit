const { Category } = require("../../db");
const deleteCategory = async (id) => {
  const deletedCategory = await Category.destroy({ where: { id } });
  if (!deletedCategory) throw new Error("No se ha encontrado la categoria");
  return deletedCategory;
};

module.exports = deleteCategory;

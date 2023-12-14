const { Category } = require("../../db");
const putCategory = async (id, data) => {
  const editCategory = await Category.findByPk(id);
  if (!editCategory) throw new Error("La categoria no ha sido encontrada");
  editCategory.set(data);
  await editCategory.save();
  return editCategory;
};

module.exports = putCategory;

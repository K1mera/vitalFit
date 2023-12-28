const { Category } = require("../../db");

const getCategory = async () => {
  const category = await Category.findAll();
  if (!category) throw new Error("No se encontraron categorías");
  return category;
};

module.exports = getCategory;

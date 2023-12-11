const { Category } = require("../../db");
const postCategory = async (data) => {
  //hace el post de varias categorías, útil para cargar  base de datos inicialmente
  if (data.length) {
    const newCategory = await data.forEach((cat) => {
      Category.findOrCreate({
        where: { name: cat.name },
      });
    });
    return newCategory;
  }

  //crea una sola categoría
  const newCategory = await Category.create({ name: data.name });
  return newCategory;
};

module.exports = postCategory;

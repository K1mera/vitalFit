const { Product, Category, SubCategory } = require("../../db");

const postProduct = async (data) => {
  const {
    name,
    price,
    size,
    stock,
    image,
    flavour,
    description,
    categoryId,
    pre_description,
    subCat,
  } = data;

  const findCat = await Category.findOne({
    where: { id: categoryId },
  });

  const created = await Product.create({
    name,
    price,
    size,
    stock,
    image,
    flavour,
    description,
    pre_description,
  });

  //asociación de Categorías, faltan subCategorias
  await created.setCategory(findCat);

  return created;
};

module.exports = postProduct;

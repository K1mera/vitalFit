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
    category,
    subCat,
  } = data;

  const findCat = await Category.findOne({
    where: { name: category },
  });

  const created = await Product.create({
    name,
    price,
    size,
    stock,
    image,
    flavour,
    description,
  });

  //asociación de Categorías, faltan subCategorias
  await created.setCategory(findCat);

  return created;
};

module.exports = postProduct;

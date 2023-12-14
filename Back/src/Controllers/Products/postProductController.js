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
  } = data;

  if (
    !name ||
    !price ||
    !size ||
    !stock ||
    !image ||
    !description ||
    !pre_description
  )
    throw new Error("Faltan datos a completar");

  if (!categoryId)
    throw new Error(
      "Para crear el producto es necesario asignarle una categoría"
    );

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

  //asociación de Categorías
  await created.setCategory(findCat);

  return created;
};

module.exports = postProduct;

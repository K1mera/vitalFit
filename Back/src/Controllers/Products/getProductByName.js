const { Op } = require("sequelize");
const { Product, Category, Review } = require("../../db");

const getProductByName = async (name) => {
  const findProduct = await Product.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: [
      { model: Category, attributes: ["name"] },
      {
        model: Review,
        attributes: ["title", "content", "rate"],
      },
    ],
  });
  return findProduct;
};

module.exports = getProductByName;

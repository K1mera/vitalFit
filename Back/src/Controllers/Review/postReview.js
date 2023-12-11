const { Review, Product } = require("../../db");
const postReview = async (data) => {
  const { title, rate, content, productId } = data;

  const createReview = await Review.create({ title, rate, content });

  const findProduct = await Product.findOne({ where: { id: productId } });

  createReview.setProduct(findProduct);

  return createReview;
};

module.exports = postReview;

const { Review, Product, User } = require("../../db");
const postReview = async (data) => {
  const { title, rate, content, productId, userId } = data;

  const createReview = await Review.create({ title, rate, content });

  const findProduct = await Product.findOne({ where: { id: productId } });

  const findUser = await User.findOne({ where: { id: userId } });

  createReview.setProduct(findProduct);
  createReview.setUser(findUser);

  return createReview;
};

module.exports = postReview;

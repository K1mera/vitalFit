const { Product, Review, User } = require("../../db");
const getReviews = async (data) => {
  const { userId, productId } = data;

  let filtroReview = {};
  if (userId) {
    const findUser = await User.findByPk(userId);
    filtroReview = { ...filtroReview, userId: findUser.id };
  }

  if (productId) {
    const findProduct = await Product.findByPk(productId);
    filtroReview = { ...filtroReview, productId: findProduct.id };
  }

  const reviews = await Review.findAll({
    where: filtroReview,
    include: [
      { model: Product, attributes: ["name"] },
      { model: User, attributes: ["email"] },
    ],
  });

  return reviews;
};

module.exports = getReviews;

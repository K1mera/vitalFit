const { Product, Review, User } = require("../../db");
const getReviews = async (data) => {
  const { userId, productId } = data;

  let filtroReview = {};
  /*  if (userId) {
    const findUser = await User.findByPk(userId);
    filtroReview = { ...filtroReview, userId: findUser.id };
  } */

  if (productId) {
    const findProduct = await Product.findByPk(productId);
    if (!findProduct) throw new Error("Este producto no éxiste");
    filtroReview = { ...filtroReview, productId: findProduct.id };
  }

  const reviews = await Review.findAll({
    where: filtroReview,
    include: [
      { model: Product, attributes: ["name"] },
      // { model: User, attributes: ["email"] },
    ],
  });

  if (!reviews) throw new Error("Este producto no tiene reviews");

  return reviews;
};

module.exports = getReviews;

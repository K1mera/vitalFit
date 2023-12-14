const { Review, Product, User } = require("../../db");
const postReview = async (data) => {
  const { title, rate, content, productId, userId } = data;

  if (!title) throw new Error("La review debe tener un título");
  if (!rate || !content || !productId)
    throw new Error("Faltan datos a completar");

  const createReview = await Review.create({ title, rate, content });

  const findProduct = await Product.findOne({ where: { id: productId } });

  /* const findUser = await User.findOne({ where: { id: userId } }); */

  createReview.setProduct(findProduct);
  /*  createReview.setUser(findUser); */

  return createReview;
};

module.exports = postReview;
